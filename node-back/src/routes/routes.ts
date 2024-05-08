const express = require('express');
import { type Request, type Response, type Router } from 'express';
const userHelpers = require('../helpers/user-helpers')
const hotelsHelpers = require('../helpers/hotels-helpers')
const bcrypt = require('bcryptjs');


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

export const routes: Router = (() => {
  const router = express.Router();

  router.post('/users/register', (req: Request, res: Response) => {
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

  router.post('/users/login', (req: Request, res: Response) => {
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

  router.get('/users/', (req: Request, res: Response) => {
    userHelpers.findAllUsers()
      .then((users: UserType[]) => {
        res.status(200).json(users)
      })
      .catch((error: NodeJS.ErrnoException) => {
        res.status(500).json({message: 'unable to retrieve users'})
      })
  })

  router.get('/users/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    userHelpers.findUserByUsername(username)
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
