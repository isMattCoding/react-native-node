import { Text, View } from "react-native";

export type ErrorType = {
  message: string;
  type: "success"|"warning"|"error"|"info";
  id: string;
}

export function Alert({message, type}:ErrorType) {

  return (
    <View className="bg-red-100 text-red-800 px-4 py-4 rounded" role="alert">
      <Text className="font-bold text-base mr-4 capitalize">{type}!</Text>
      <Text className="block text-sm sm:inline max-sm:mt-1">{message}</Text>
    </View>
  )
}
