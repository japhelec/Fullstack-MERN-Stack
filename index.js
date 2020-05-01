const bodyParser = require("body-parser");
const path = require("path");
const express = require("express"); //server side common JS module system
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/user");
require("./services/passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express(); //start an app, there may be more than one app

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000; //Heroku tells us what port to listen
app.listen(PORT); //tell node to help listen on port PORT
