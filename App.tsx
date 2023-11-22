import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import { View, StyleSheet,Text} from "react-native";
import { StatusBar } from 'expo-status-bar';
export default function App() {
 


  return (
    <NavigationContainer>
     <StatusBar style="light"  />
    <Routes/>
    
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
