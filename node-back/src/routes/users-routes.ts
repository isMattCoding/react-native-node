const express = require('express');
import { type Request, type Response } from 'express';
const userHelpers = require('../helpers/user-helpers')
const bcrypt = require('bcryptjs');

const router = express.Router();

type UserType = {
  id: number;
  username: string;
  password: string;
}

router.post('/register', (req: Request, res: Response) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if(!(username && password)) {
    return res.status(400).json({message: "Username and password required"})
  }

  const hash = bcrypt.hashSync(credentials.password, 12)
  credentials.password = hash

  userHelpers.addUser(credentials)
    .then((user: UserType) => {
      res.status(200).json(user)
    })
    .catch((error: NodeJS.ErrnoException)=> {
      if(error.errno == 19) {
        res.status(400).json({message: "Username already taken"})
      } else {
        res.status(500).json(error)
      }
    })
})

router.post('/login', (req: Request, res: Response) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if(!(username && password)) {
    return res.status(400).json({message: "Username and password required"})
  }

  userHelpers.findUserByUsername(username)
    .then((user: UserType) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}`})
      } else {
        res.status(401).json({ message: "Invalid credentials"})
      }
    })
    .catch((error: NodeJS.ErrnoException) => {
      res.status(500).json(error)
    })
})

router.get('/', (req: Request, res: Response) => {
  userHelpers.findAllUsers()
    .then((users: UserType[]) => {
      res.status(200).json(users)
    })
    .catch((error: NodeJS.ErrnoException) => {
      res.status(500).json({message: 'unable to retrieve users'})
    })
})

router.get('/:username', (req: Request, res: Response) => {
  const { username } = req.params;
  userHelpers.findUserByUsername(username)
    .then((user: UserType) => {
      res.status(200).json(user)
    })
    .catch((error: NodeJS.ErrnoException) => {
      res.status(500).json(error)
    })
})

module.exports = router;
