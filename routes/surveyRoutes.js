const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    // since we havent created a route on the react, we need to ensure that we pass along
    // these properties to the front end 
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // const mailer = new Mailer(survey, surveyTemplate(survey));
        // mailer.send();
        
        // const m = Mailer();      //working 1
        const m = Mailer(survey, surveyTemplate(survey));   // working 2


    });

};