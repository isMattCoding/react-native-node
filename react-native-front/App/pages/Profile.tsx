import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Text, View } from "react-native";
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
