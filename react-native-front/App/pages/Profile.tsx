import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Pressable, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../providers/AuthContext";
const TOKEN_KEY = 'my-jwt';


type ProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Profile'>;

export const ProfileScreen = ({navigation, route}: ProfileScreenNavigationProp) => {
  const { authState, onLogOut, onLogin } = useAuth();

  return <View>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
};
