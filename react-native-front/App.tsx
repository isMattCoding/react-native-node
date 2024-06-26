import "./output.css"
import AuthProvider from "./App/providers/AuthContext";
import { Layout } from "./App/_Layout";

export type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Profile: { name: string };
  Registration: undefined;
  Login: undefined;
};

export default function App() {

  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}
