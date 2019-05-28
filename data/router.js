const db = require('./db')

const router = require('express').Router();

router.get('/', (req, res) => {
    db
    .find().then(posts => {
        res.status(201)
        .json(posts)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(post => {
        res.json({ post })
    })
})

module.exports = router;