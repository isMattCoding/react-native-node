import { Button, StyleSheet, Text } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps, createNativeStackNavigator, type NativeStackNavigationProp} from '@react-navigation/native-stack';


type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Profile: { name: string };
};

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

type ProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({navigation}: HomeScreenNavigationProp) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
};
const ProfileScreen = ({navigation, route}: ProfileScreenNavigationProp) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
