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
  loaded: boolean
}
const AuthProvider = ({children}: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthStateType>(
    {
      token: null,
      authenticated: null,
      loaded: false
    }
  );

  useEffect(() => {
    const loadToken = async () => {
      const token = Platform.OS === 'web' ? (
        await AsyncStorage.getItem(TOKEN_KEY)
      ) : (
        await SecureStore.getItemAsync(TOKEN_KEY)
      )

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated:true,
          loaded: true
        })
      } else {
        setAuthState({
          token: token,
          authenticated:false,
          loaded: true
        })
      }
    }
    loadToken();
  }, [])

  const register = async (username: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/api/users/register`, {username, password})
    } catch (e) {
      if((e as any).response) {
        return {error: (e as any).response.data, success: false}
      }
      return e;
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/api/users/login`, {username, password})
      setAuthState({
        token: result.data.token,
        authenticated: true,
        loaded: true
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
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(TOKEN_KEY)
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY)
    }

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
      loaded: true
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
