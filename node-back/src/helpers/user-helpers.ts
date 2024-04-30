const database = require('../dbConfig');

async function addUser(user: any) {
  return await database('users').insert(user, ['id', 'username'])
}
function findAllUsers() {
  return database('users')
}
function findUserByUsername(username:string) {
  return database('users').where({ username }).first()
}

module.exports = {
  addUser,
  findAllUsers,
  findUserByUsername
}
