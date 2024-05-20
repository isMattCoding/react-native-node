export function createUser(
  username:string,
  password: string,
) {
  const data = {
    username: username,
    password: password
  };

  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if(response.ok) {
        resolve({success: true, response: response.json()})
      }
      return response.json()
    })
    .then(responseData => Promise.reject(responseData))
    .catch(error => {
      console.log(error);
      reject(error);
    });
  })
}
