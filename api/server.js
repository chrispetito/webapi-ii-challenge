const express = require('express');

const server = express();

const router = require('../data/router')

server.use(express.json());


server.get('/', (req, res) => {
    res.send(
        '<h1>Testing</h1>'
    )
})

server.use('/api/posts', router)

module.exports = server;