import React, { FC, ReactElement, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createUser } from "../../authentification";
import { ErrorType } from "../../components/Alert";
import { Alerts } from "../../components/Alerts";
import { FormInput } from "../../components/FormInput";

export const UserRegistration: FC<{}> = ({}): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([])

  async function onSubmit() {
    if (password === cPassword) {

      setErrors(errors => errors.filter(error => error.id !== 'registrationCPassword'));

      try {
        const response = await createUser(username, password);

      } catch (error) {
        setErrors(errors => [...errors, {
          message: "An unexpected error occurred.",
          type: "error",
          id: "unexpectedError"
        }]);
      }
    } else {
      setErrors(errors => [...errors, {
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
            onPress={()=>{}}
            className="text-blue-600 font-semibold hover:underline ml-1">
              Login here
          </Pressable>
        </Text>
      </View>
    </form>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
