import {NavigationContainer} from '@react-navigation/native';
import { UserRegistrationScreen } from "../App/pages/authentication/UserRegistrationScreen";
import {type NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';

import { UserLoginScreen } from "../App/pages/authentication/UserLoginScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

import React from 'react'
import { RootStackParamList } from '../App';
import { useAuth } from './providers/AuthContext';
import { HomeScreen } from './pages/Home';
import { Button } from 'react-native';
import { ProfileScreen } from './pages/Profile';

export const Layout = () => {
  const { authState, onLogOut } = useAuth();
  console.log(authState)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState?.authenticated ? (
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Welcome',
                headerRight: () => <Button onPress={onLogOut} title="Sign Out" />,
              }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={UserLoginScreen}
            />
          )
        }
        <Stack.Screen
          name="Registration"
          component={UserRegistrationScreen}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
