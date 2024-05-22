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

module.exports = {
  addUser,
  findAllUsers,
  findUserByUsername,
  checkUsernameAndPassword
}
