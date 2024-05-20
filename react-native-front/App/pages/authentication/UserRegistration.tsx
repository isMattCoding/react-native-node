import React, { FC, ReactElement, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { createUser } from "../../authentication";
import { ErrorType } from "../../components/Alert";
import { Alerts } from "../../components/Alerts";
import { FormInput } from "../../components/FormInput";
import { RegistrationScreenNavigationProp } from "./UserRegistrationScreen";

export function UserRegistration({navigation, route}: RegistrationScreenNavigationProp) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([])

  async function onSubmit() {
    if (password === cPassword) {

      setErrors(errors => errors.filter(error => error.id !== 'registrationCPassword'));

      try {
        const response = await createUser(username, password);
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
    } else {
      setErrors([{
        message: "The passwords do not match.",
        type: "error",
        id: "registrationCPassword"
      }]);
    }
  }

  return (
    <form>
      <View className="flex space-y-8 [&>*:not(:first-child)]:mt-8" id="toto">
        <Text className="text-2xl">Registration</Text>
        <Alerts errors={errors} />
        <FormInput
          placeholder="Username"
          label="Username"
          id="registrationUsername"
          ariaLabel="Register Username"
          ariaLabelInput="Register Username Input"
          value={username}
          setValue={setUsername}
          error={errors.find(error => error.id === 'registrationUsername')}
        />
        <FormInput
          placeholder="Password"
          label="Password"
          id="registrationPassword"
          ariaLabel="Register Password"
          ariaLabelInput="Register Password Input"
          value={password}
          setValue={setPassword}
          error={errors.find(error => error.id === 'registrationPassword')}
          secureTextEntry={true}
        />
        <FormInput
          placeholder="Confirm Password"
          label="Confirm Password"
          id="registrationCPassword"
          ariaLabel="Confirm Password"
          ariaLabelInput="Confirm Password Input"
          value={cPassword}
          setValue={setCPassword}
          error={errors.find(error => error.id === 'registrationCPassword')}
          secureTextEntry={true}
        />
        <View className="!mt-10">
          <Pressable onPress={onSubmit}>
            <Text className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
              Create an account
            </Text>
          </Pressable>
        </View>
        <Text className="text-sm mt-6 text-center">
          Already have an account?
          <Pressable
            onPress={()=>{navigation.navigate("Login")}}
            className="text-blue-600 font-semibold hover:underline ml-1">
              Login here
          </Pressable>
        </Text>
      </View>
    </form>
  );
};
