import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "./src/navigation";

export default function App() {
    return <Routes />;
}


