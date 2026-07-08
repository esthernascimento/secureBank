import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Pressable } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Cadastro");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.View animation="bounceInDown">
        <Image source={require("../../../assets/img/secureBank-logo.png")} style={styles.img} />
        <Image
          source={require("../../../assets/img/carregando.gif")}
          style={styles.carregando}
        />
      </Animatable.View>

      <StatusBar style="auto" />
    </View>
  );
}
