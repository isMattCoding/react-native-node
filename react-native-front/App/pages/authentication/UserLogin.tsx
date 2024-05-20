import React, { FC, ReactElement, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { createUser, login } from "../../authentication";
import { ErrorType } from "../../components/Alert";
import { Alerts } from "../../components/Alerts";
import { FormInput } from "../../components/FormInput";
import { LoginScreenNavigationProp } from "./UserLoginScreen";

export function UserLogin({navigation, route}: LoginScreenNavigationProp) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([])

  async function onSubmit() {
    try {
      const response = await login(username, password);
      if(response.success) {
        navigation.navigate('Home')
      }

    } catch (e) {
      const error = e as ErrorType;
      setErrors([{
        message: error.message ?? "Unexpected error occurred.",
        type: error.type ?? "error",
        id: error.id ?? "unexpectedError"
      }]);
    }
  }

  return (
    <form>
      <View className="flex space-y-8 [&>*:not(:first-child)]:mt-8" id="toto">
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
          <Pressable onPress={onSubmit}>
            <Text className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
              Login
            </Text>
          </Pressable>
        </View>
        <Text className="text-sm mt-6 text-center">
          Don't have an account?
          <Pressable
            onPress={()=>{navigation.navigate("Registration")}}
            className="text-blue-600 font-semibold hover:underline ml-1">
              Register here
          </Pressable>
        </Text>
      </View>
    </form>
  );
};
