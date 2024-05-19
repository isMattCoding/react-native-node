import React, { FC, ReactElement, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { createUser } from "../../authentification";

export const UserRegistration: FC<{}> = ({}): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    createUser(username, password);
  }

  return (
    <>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable onPress={onSubmit}>
        <Text className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
          Create an account
        </Text>
      </Pressable>
      <Text className="text-sm mt-6 text-center">
        Already have an account?
        <Pressable
          onPress={()=>{}}
          className="text-blue-600 font-semibold hover:underline ml-1">
            Login here
        </Pressable>
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
