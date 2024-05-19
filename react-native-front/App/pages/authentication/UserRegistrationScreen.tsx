import React from 'react';
import { SafeAreaView, StatusBar, Text, View} from 'react-native';
import {UserRegistration} from './UserRegistration';

export function UserRegistrationScreen() {

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <View>
          <Text>
            {'User Registration'}
          </Text>
        </View>
        <UserRegistration />
      </SafeAreaView>
    </>
  );
}
