const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  //INDEX
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });
  // SHOW EDIT
  app.get("/api/surveys/:id", requireLogin, async (req, res) => {
    const survey = await Survey.findById({
      _user: req.user.id,
      _id: req.params.id,
    });
    res.send(survey);
  });
  //CREATE
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    //build Survey model instance
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map((email) => ({
        email: email.trim(),
      })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    //place to send Email and refresh credits
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  //UPDATE
  app.patch("/api/surveys/:id", (req, res) => {
    console.log(req.params.id);
    Survey.findByIdAndUpdate(req.params.id, { title: req.body.title }).then(
      () => {
        res.send("OK");
      }
    );
  });
  //DELETE
  app.delete("/api/surveys/:id", (req, res) => {
    Survey.findByIdAndRemove(req.params.id).then(() => {
      res.send("OK");
    });
  });

  //Thank user for leaving rating.
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting");
  });

  //Dealing with webhook logic
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });
};

// before sendgrid make some official modification, the datas sent by sendgrid is
// array of several replies in last 30 secs, so we need to deal with it by loop
// app.post("/api/surveys/webhooks", (req, res) => {
//   const p = new Path("/api/surveys/:surveyId/:choice");
//   lodash basic logic
//   const events = _.map(req.body, ({ email, url }) => {
//     const match = p.test(new URL(url).pathname);
//     if (match) {
//       return { email, surveyId: match.surveyId, choice: match.choice };
//     }
//   });
//   const compactEvents = _.compact(events);
//   const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

//   lodash chain refactoring
//   const events = _.chain(req.body)
//     .map( ({ email, url }) => {
//       const match = p.test(new URL(url).pathname);
//       if (match) {
//         return { email, surveyId: match.surveyId, choice: match.choice };
//       }
//     })
//     .compact()
//     .uniqBy("email", "surveyId")
//     .value();
//   console.log(events)
//   res.send({});
// });
