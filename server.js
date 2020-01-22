const express = require('express');

const server = express();

const accountRouter = require('./accounts/account-router.js');

server.use(express.json());

server.use('/api/accounts', accountRouter);
// import the router into server.

server.get('/', (req, res) => {
    return res.send('<h1>I am in the server. WOO!</h1>')
});

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ message: 'Something is wrong.' })
});

module.exports = server;