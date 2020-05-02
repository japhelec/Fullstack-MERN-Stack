const keys = require("../config/keys");
const sendgrid = require("sendgrid");
const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  //setting customized Mailer class
  constructor({ subject, recipients }, content) {
    //set from_email, subject, body, and recipients, using helper.Email
    super();
    this.sgApi = sendgrid(keys.sendGridKey); //api key
    this.from_email = new helper.Email("material3679@gmail.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);
    

    //helper.Email is not enough, more modification of each one is needed
    this.addContent(this.body); // body
    this.addClickTracking(); //template link change based on different recipient
    this.addRecipients(); // add recipients into mailer
  }

  //capture only email propperty out of recipients object (which is array of {email,clicked})
  //also use helper.Email to customized
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return helper.Email(email);
    });
  }

  // Documentaion rule
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  //send mailer to sendgrid server and tell it to help us send mails
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
