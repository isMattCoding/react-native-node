import React from 'react';
import { SafeAreaView, StatusBar, View} from 'react-native';
import {UserLogin} from './UserLogin';
import { RootStackParamList } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export function UserLoginScreen({navigation, route}: LoginScreenNavigationProp) {

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen p-4 mx-auto max-w-md w-full">
        <View className="border bg-white border-gray-300 rounded-md p-6 m-4">
          <UserLogin navigation={navigation} route={route} />
        </View>
      </SafeAreaView>
    </>
  );
}
