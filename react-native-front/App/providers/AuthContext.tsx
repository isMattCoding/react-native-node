import { View, Text } from 'react-native'
import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { AuthenticationResponse, createUser, login } from '../authentication';
import { ErrorType } from '../components/Alert';

interface AuthProps {
  authState?: AuthStateType;
  onRegister?: (username: string, password: string) => Promise<AuthenticationResponse>;
  onLogin?: (username: string, password: string) => Promise<AuthenticationResponse>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext);
}

type AuthStateType = {
  token: string | null,
  authenticated: boolean | null,
}
const AuthProvider = ({children}: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthStateType>(
    {
      token: null,
      authenticated: null
    }
  )

  const authenticate = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      if (result.success) {
        setAuthState({
          token: result.response.token,
          authenticated: true
        })
      }
    } catch (e) {
      const error = e as ErrorType;
      return error;
    }
  }

  const value = {
    onRegister: createUser
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
