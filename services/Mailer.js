// working code 1
/* 
module.exports = async () => {
    const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendGridKey);
const msg = {
  to: 'excoolzola@gmail.com',
  from: 'excoolzola@gmail.com', // Use the email address or domain you verified above
  subject: 'FullStackReact Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

 */ 

//  working code 2

const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = async ({ subject, recipients }, content) => {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(keys.sendGridKey);
  const formattedRecipients = recipients.map(({email}) => email);
  const msg = {
    to: formattedRecipients,
    // to: 'excoolzola@gmail.com',
    from: 'excoolzola@gmail.com',
    subject: subject,
    html: content,
  };
  return await sgMail.send(msg);
}



// deprecated old stephen grider sendgrid lib code 

/* 
const sendgrid = require('sendgrid');
// const {mail} = sendgrid;
const helper = sendgrid.mail;
const keys = require('../config/keys');

// helper.Mail is a class which has many properties that we are going to customise and 
// therfore extend it
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        // this.from_email = new helper.Email('no-reply@emaily.com');
        this.from_email = new helper.Email('excoolzola@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        // we need to register the body with the Mailer itself
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses = (recipients) => {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking = () => {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients = () => {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    send = async () => {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: 'v3/mail/send',
            body: this.toJSON()
        });
        const response = await this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer; */