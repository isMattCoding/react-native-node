import React from 'react';
import { SafeAreaView, StatusBar, Text, View} from 'react-native';
import {UserRegistration} from './UserRegistration';

export function UserRegistrationScreen() {

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen p-4">
        <View className="max-w-md w-full mx-auto border bg-white border-gray-300 rounded-md p-6">
          <UserRegistration />
        </View>
      </SafeAreaView>
    </>
  );
}
