const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    // since we havent created a route on the react, we need to ensure that we pass along
    // these properties to the front end 

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thank you for giving your feedback and appreciate your valuable time.');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
        // mailer.send();   // this is async , therefore req res arrow func also async

        // const m = Mailer();      //working 1
        // const m = await Mailer(survey, surveyTemplate(survey));   // working 2
        try {
            Mailer(survey, surveyTemplate(survey));   // working 2

        } catch (err) {
            res.status(432).send(err);
        }
        try {
            await survey.save();
            // }
            // catch (err) {
            // res.status(442).send(err);
            // }
            // await m.send();
            // try {
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);     // this is done so that the header in the app updates the credit of the user
        }
        catch (err) {
            res.status(452).send(err);
        }
        // by sending the updated user model


    });

};