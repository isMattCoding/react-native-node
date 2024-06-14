import {NavigationContainer} from '@react-navigation/native';
import { UserRegistrationScreen } from "../App/pages/authentication/UserRegistrationScreen";
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import { UserLoginScreen } from "../App/pages/authentication/UserLoginScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

import React from 'react'
import { RootStackParamList } from '../App';
import { useAuth } from './providers/AuthContext';
import { HomeScreen } from './pages/Home';
import { Pressable, Text } from 'react-native';
import { ProfileScreen } from './pages/Profile';

export const Layout = () => {
  const { authState, onLogOut } = useAuth();
  if (authState?.loaded === false) return;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState?.authenticated ? (
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Home',
                headerRight: () => <Pressable className="text-black mr-2"onPress={onLogOut}><Text>Sign Out</Text></Pressable>,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={UserLoginScreen}
              />
              <Stack.Screen
                name="Registration"
                component={UserRegistrationScreen}
              />
            </>
          )
        }
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
