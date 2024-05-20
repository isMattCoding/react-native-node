import { ErrorType } from "./components/Alert";

interface AuthenticationSuccessResponse {
  success: true;
  response: Record<string, any>;
}

interface AuthenticationErrorResponse extends ErrorType {
  success: false;
}

export type AuthenticationResponse = AuthenticationSuccessResponse | AuthenticationErrorResponse;

export function createUser(
  username:string,
  password: string,
):Promise<AuthenticationResponse> {
  const data = {
    username: username,
    password: password
  };

  return new Promise((resolve, reject) => {
    fetch('http://localhost:5001/api/users/register', {
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

export function login(
  username:string,
  password: string,
):Promise<AuthenticationResponse> {
  const data = {
    username: username,
    password: password
  };

  return new Promise((resolve, reject) => {
    fetch('http://localhost:5001/api/users/login', {
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
