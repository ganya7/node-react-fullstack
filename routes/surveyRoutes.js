const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Path = require('path-parser');
const { URL } = require('url');

const Survey = mongoose.model('surveys');

module.exports = app => {


    app.get('/api/surveys', async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
        res.send(surveys);
    });

    // since we havent created a route on the react, we need to ensure that we pass along
    // these properties to the front end 
    // app.get('/api/surveys/thanks', (req, res) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for giving your feedback and appreciate your valuable time.');
    });

    /*
    app.post('/api/surveys/webhooks', (req, res) => {
        // console.log(req.body);
        // res.send({});
        // const events = _.map(req.body, (event)=>{
        const pathname = new URL(url).pathname;
        const events = _.map(req.body, ({email,url})=>{
        
            /* const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveryId/:choice');
            const match = p.test(pathname); */

    /*    /*
        const match = p.test(new Path('/api/surveys/:surveyId/:choice'));

        // we cannot destructure match into {surveyId, choice} because
        // it can also be null that cannot be destructure and therefore 
        // we cannot do default destructuring
        if(match){
            return {
                email,
                surveyId: match.surveyId,
                choice: match.choice
            };
        }
    });
    const compactEvents = _.compact(events);
    const uniqEvents = _.uniqBy(compactEvents, 'email','surveyId');
    console.log(uniqEvents);
    res.send({});
})

*/

    // lodash chain refactor
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveryId/:choice');
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new Path('/api/surveys/:surveyId/:choice'));
                if (match) {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {
                            email: email,
                            responded: false
                        }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec()
            })
            .value()
        res.send({});
    })



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
        }
        catch (err) {
            res.status(442).send(err);
        }
        // await m.send();
        try {
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