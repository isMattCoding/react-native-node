const express = require('express');
import { type Request, type Response } from 'express';
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');


import { routes } from './routes/routes'

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the node app server!!!')
});

server.post("/user/generateToken",  (req: Request, res: Response) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    const options = {
      expiresIn: "7d"
    }

    const token = jwt.sign(data, jwtSecretKey, options);

    res.send(token);
})

server.get("/user/validateToken", (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            return res.status(401).send('error');
        }
    } catch (error) {
        return res.status(401).send(error);
    }
});

server.use('/api', routes)

module.exports = server;
