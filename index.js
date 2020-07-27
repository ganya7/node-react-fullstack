const express = require('express');
// const passportConfig = require('./services/passport')
// require('./services/passport');      //the order of requiring User and passport is important as we want
// to create the model user first which is then used by passport
require('./models/User');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,   // 30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
// authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // express will serve the production assets
    // like our main.js / main.css file
    app.use(express.static('/client/build'));

    // express will serve up the index.html file
    // if it doesnt recognize the route
    /* const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }); */
    const root = require('path').join(__dirname, 'client', 'build')
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);