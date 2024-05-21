import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ErrorType } from "../../components/Alert";
import { Alerts } from "../../components/Alerts";
import { FormInput } from "../../components/FormInput";
import { LoginScreenNavigationProp } from "./UserLoginScreen";
import { useAuth } from "../../providers/AuthContext";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'my-jwt';
export function UserLogin({navigation, route}: LoginScreenNavigationProp) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([])
  const { authState, onLogOut, onLogin } = useAuth();

  const login = async () => {
    console.log('hi')
    const result = await onLogin!(username, password);
    console.log('result', result)
    if (result && result.error) {
      setErrors([{
        message: result.error.message,
        type: result.error.type,
        id: result.error.id
      }])
      console.log('result.msg', result.msg, result);
    }
  }

  return (
    <View>
      <View className="flex [&>*:not(:first-child)]:mt-8" id="toto">
        <Text className="text-2xl">Login</Text>
        <Alerts errors={errors} />
        <FormInput
          placeholder="Username"
          label="Username"
          id="loginUsername"
          ariaLabel="Login Username"
          ariaLabelInput="Login Username Input"
          value={username}
          setValue={setUsername}
          error={errors.find(error => error.id === 'loginUsername')}
        />
        <FormInput
          placeholder="Password"
          label="Password"
          id="loginPassword"
          ariaLabel="Login Password"
          ariaLabelInput="Login Password Input"
          value={password}
          setValue={setPassword}
          error={errors.find(error => error.id === 'loginPassword')}
          secureTextEntry={true}
        />
        <View className="!mt-10">
          <Text className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
            <Pressable onPress={login}>
              <Text>Login</Text>
            </Pressable>
          </Text>
        </View>
        <Text className="text-sm mt-6 text-center">
          Don't have an account?
          <Pressable
            onPress={()=>{navigation.navigate("Registration")}}
            className="text-blue-600 font-semibold hover:underline ml-1">
              <Text>Register here</Text>
          </Pressable>
        </Text>
      </View>
      <Pressable
        onPress={()=>console.log(
          'secure', SecureStore.getItemAsync(TOKEN_KEY),
          'asyncstorage', AsyncStorage.getItem(TOKEN_KEY),
          'auth', authState
        )}
      >
        <Text>toto</Text>
      </Pressable>
    </View>
  );
};
