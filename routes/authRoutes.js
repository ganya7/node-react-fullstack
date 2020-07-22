const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google'),
        // passport middleware doesnt know what to do after completing the request with google auth
        // it then passes the request to the next middleware but since we do not have one it gives an error
        // we handle the next request with the arrow function
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/current_user', (req, res) => {
        // res.send(req.session);
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        // res.send(req.user);
        res.redirect('/');
    });
}