const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');


const server = express();

server.get('/', (req, res) => {
  res.status(200).json({message: 'Here is my Sprint.'})
})
module.exports = server;