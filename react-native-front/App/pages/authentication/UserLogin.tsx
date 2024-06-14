import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { ErrorType } from "../../components/Alert";
import { Alerts } from "../../components/Alerts";
import { FormInput } from "../../components/FormInput";
import { LoginScreenNavigationProp } from "./UserLoginScreen";
import { useAuth } from "../../providers/AuthContext";

const TOKEN_KEY = 'my-jwt';
export function UserLogin({navigation, route}: LoginScreenNavigationProp) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([])
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      setErrors([{
        message: result.error.message,
        type: result.error.type,
        id: result.error.id
      }])
    }
  }

  return (
    <View>
      <View className="flex [&>*:not(:first-child)]:mt-8" id="toto">
        <Text className="text-2xl mb-8 sm:mb-0">Login</Text>
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
          <Text>
            <Pressable className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none" onPress={login}>
              <Text>Login</Text>
            </Pressable>
          </Text>
        </View>
        <View className="flex-row mt-5 justify-center">
          <Text className="mr-2">Don't have an account?</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("Registration")}}>
            <Text className="text-blue-600 font-semibold hover:underline align-bottom">Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
