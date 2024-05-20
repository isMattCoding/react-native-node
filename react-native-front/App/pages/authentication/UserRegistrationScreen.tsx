import React from 'react';
import { SafeAreaView, StatusBar, Text, View} from 'react-native';
import {UserRegistration} from './UserRegistration';
import { RootStackParamList } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RegistrationScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Registration'
>;

export function UserRegistrationScreen({navigation, route}: RegistrationScreenNavigationProp) {

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen p-4">
        <View className="max-w-md w-full mx-auto border bg-white border-gray-300 rounded-md p-6">
          <UserRegistration navigation={navigation} route={route} />
        </View>
      </SafeAreaView>
    </>
  );
}
