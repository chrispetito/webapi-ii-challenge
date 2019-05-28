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

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
    .then(comments => {
        res.json({ comments })
    })
})

router.post('/', (req, res) => {
    const { title, contents, created_at, updated_at } = req.body
    db.insert({ title, contents, created_at, updated_at })
    .then(response => {
        res.status(201).json(response)
    })
})

module.exports = router;