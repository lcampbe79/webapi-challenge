const express = require('express'); // importing a CommonJS module

const projectRouter = require('./data/routers/projectRouter');
const actionRouter = require('./data/routers/actionRouter')

const server = express();

//middleware
server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.status(200).json({message: 'Here is my Sprint.'})
})

module.exports = server;