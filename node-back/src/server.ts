const express = require('express');
import { type Request, type Response } from 'express';
const cors = require('cors');
const helmet = require('helmet');

import { routes } from './routes/routes'

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the node app server!!!')
});

server.use('/api', routes)

module.exports = server;
