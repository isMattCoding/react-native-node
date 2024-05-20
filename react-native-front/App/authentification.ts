import { ErrorType } from "./components/Alert";

interface UserRegistrationSuccessResponse {
  success: true;
  response: Record<string, any>;
}

interface UserRegistrationErrorResponse extends ErrorType {
  success: false;
}

type UserRegistrationResponse = UserRegistrationSuccessResponse | UserRegistrationErrorResponse;

export function createUser(
  username:string,
  password: string,
):Promise<UserRegistrationResponse> {
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
      reject({...error, success: false,});
    });
  })
}
