const server = require('./api/server')

server.listen(4000, () => {
    console.log('Server running on 4k')
})

server.get('/', (req, res) => {
    '<h1>blah</h1>'
})