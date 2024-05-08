const user_database = require('../dbConfig');

async function addUser(user: any) {
  return await user_database('users').insert(user, ['id', 'username'])
}
function findAllUsers() {
  return user_database('users')
}
function findUserByUsername(username:string) {
  return user_database('users').where({ username }).first()
}

module.exports = {
  addUser,
  findAllUsers,
  findUserByUsername
}
