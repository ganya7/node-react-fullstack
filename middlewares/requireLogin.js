module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must be logged in!' });
    }
    // this is to pass the data to the next middleware
    next();
};