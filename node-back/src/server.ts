const express = require('express');
import { Request, Response } from 'express';
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./routes/users-routes')

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the node app server!!!')
});

server.use('/api/users', usersRouter)

module.exports = server;
