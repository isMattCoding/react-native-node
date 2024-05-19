export function createUser(username:string, password: string) {
  const data = {
    username: username,
    password: password
  };

  fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(responseData => {
      console.log(responseData);
  })
  .catch(error => {
      console.log(error);
  });
}
