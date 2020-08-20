module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(401).send({ error: 'Not enough credits, please add some and try again' });
    }
    // this is to pass the data to the next middleware
    next();
};