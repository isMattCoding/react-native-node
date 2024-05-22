import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthProps {
  authState?: AuthStateType;
  onRegister?: (username: string, password: string) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogOut?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://localhost:5001'

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
  );

  useEffect(() => {
    console.log('secure', SecureStore.getItemAsync(TOKEN_KEY))
    console.log('react-storage', AsyncStorage.getItem(TOKEN_KEY))
    const loadToken = async () => {
      const token = Platform.OS === 'web' ? (
        await AsyncStorage.getItem(TOKEN_KEY)
      ) : (
        await SecureStore.getItemAsync(TOKEN_KEY)
      )

      console.log("stored", token)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated:true
        })
      }
    }
    loadToken();
  }, [])

  const register = async (username: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/api/users/register`, {username, password})
    } catch (e) {
      return {error: true, msg: (e as any).response.data.msg}
    }
  }

  const login = async (username: string, password: string) => {
    try {
      console.log('we are in the request')
      console.log(username, password)
      const result = await axios.post(`${API_URL}/api/users/login`, {username, password})
      console.log('result', result)
      setAuthState({
        token: result.data.token,
        authenticated: true
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`

      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(TOKEN_KEY, result.data.token)
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
      }


      return {success: true, response: result.data};
    } catch (e) {
      if((e as any).response) {
        return {error: (e as any).response.data, success: false}
      }
      return e;
    }
  }

  const logout = async () => {
    console.log('hi')
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(TOKEN_KEY)
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY)
    }

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false
    })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogOut: logout,
    authState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
