const db = require('./db')

const router = require('express').Router();

router.get('/', (req, res) => {
    db
    .find().then(posts => {
        res.status(201)
        .json(posts)
    })
})

module.exports = router;