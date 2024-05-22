const user_database = require('../dbConfig');
const jwt = require('jsonwebtoken');

async function addUser(user: any) {
  return await user_database('users').insert(user, ['id', 'username'])
}
function findAllUsers() {
  return user_database('users')
}
function findUserByUsername(username:string) {
  return user_database('users').where({ username }).first()
}
function checkUsernameAndPassword(username:string, password:string, type:"registration"|"login") {
  if(!(username && password)) {
    return {
      message: "Username and password required",
      type: "error",
      id: !username ? `${type}Username` : `${type}Password`
    }
  }
  return;
}
function getJWTToken(key:string, username: string |string[]) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      username: username,
  }
  const options = {
    expiresIn: "7d"
  }

  return jwt.sign(data, jwtSecretKey, options);
}

module.exports = {
  addUser,
  findAllUsers,
  findUserByUsername,
  checkUsernameAndPassword,
  getJWTToken
}
