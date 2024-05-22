const express = require('express');
import { type Request, type Response, type Router } from 'express';
const userHelpers = require('../helpers/user-helpers')
const hotelsHelpers = require('../helpers/hotels-helpers')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

type UserType = {
  id: number;
  username: string;
  password: string;
}

type HotelType = {
  id: number;
  name: string;
  city: string;
}

type UpgradeType = {
  id: number;
  hotel_id: number;
  price: number;
  type: string;
}

const {
  addUser,
  findAllUsers,
  findUserByUsername,
  checkUsernameAndPassword,
  getJWTToken
} = userHelpers;

export const routes: Router = (() => {
  const router = express.Router();

  router.post('/users/register', (req: Request, res: Response) => {
    const credentials = req.body;
    const { username, password } = credentials;

    const noUsernameOrPassword = checkUsernameAndPassword(username, password, "registration")
    if (noUsernameOrPassword) {
      return res.status(400).json(noUsernameOrPassword)
    }

    const hash = bcrypt.hashSync(credentials.password, 12)
    credentials.password = hash

    addUser(credentials)
      .then((user: UserType) => {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const username = req.headers['username'];
        const token = getJWTToken(jwtSecretKey, username)
        console.log(user, 'created')
        res.status(200).json({user, token, authenticated: true})
      })
      .catch((error: NodeJS.ErrnoException)=> {
        if(error.errno == 19) {
          res.status(400).json({
            message: "Username already taken",
            type: "error",
            id: "registrationUsername",
          })
        } else {
          res.status(500).json(error)
        }
      })
  })

  router.post('/users/login', (req: Request, res: Response) => {
    const credentials = req.body;
    const { username, password } = credentials;

    const noUsernameOrPassword = checkUsernameAndPassword(username, password, "login")
    if (noUsernameOrPassword) {
      return res.status(400).json(noUsernameOrPassword)
    }

    findUserByUsername(username)
      .then((user: UserType) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const jwtSecretKey = process.env.JWT_SECRET_KEY;
          const username = req.headers['username'];
          const token = getJWTToken(jwtSecretKey, username)
          res.status(200).json({ message: `Welcome ${user.username}`, token, authenticated: true})
        } else {
          res.status(401).json({
            message: "Invalid credentials",
            type: "error",
            id: "loginPassword"
          })
        }
      })
      .catch((error: NodeJS.ErrnoException) => {
        res.status(500).json(error)
      })
  })

  router.get('/users/', (req: Request, res: Response) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
      const token = req.header(tokenHeaderKey);

      const verified = jwt.verify(token, jwtSecretKey);
      if (verified) {
        findAllUsers()
          .then((users: UserType[]) => {
            res.status(200).json(users)
          })
          .catch((error: NodeJS.ErrnoException) => {
            res.status(500).json({message: 'unable to retrieve users'})
          })
        }
      } catch (error) {
      return res.status(401).send(error);
    }
  })

  router.get('/users/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    findUserByUsername(username)
      .then((user: UserType) => {
        res.status(200).json(user)
      })
      .catch((error: NodeJS.ErrnoException) => {
        res.status(500).json(error)
      })
  })

  router.get('/hotels/hotel_upgrades/:hotel_id', (req: Request, res: Response) => {
    const { hotel_id } = req.params;
    hotelsHelpers.findAllUpgradesByHotel(parseInt(hotel_id))
      .then((user: UpgradeType[]) => {
        res.status(200).json(user)
      })
      .catch((error: NodeJS.ErrnoException) => {
        res.status(500).json(error)
      })
  })

  router.get('/hotels', (req: Request, res: Response) => {
    hotelsHelpers.findAllHotels()
      .then((hotels: HotelType[]) => {
        res.status(200).json(hotels)
      })
      .catch((error: NodeJS.ErrnoException) => {
        res.status(500).json({message: 'unable to retrieve users'})
      })
  })

  return router;
})();
