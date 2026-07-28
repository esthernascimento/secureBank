import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";

import styles from "./style";

export default function Login() {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const realizarLogin = async () => {

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {

      const usuarioSalvo = await AsyncStorage.getItem("dadosUsuario");

      if (!usuarioSalvo) {
        alert("Nenhum usuário cadastrado.");
        return;
      }

      const dadosUsuario = JSON.parse(usuarioSalvo);

      if (
        dadosUsuario.email === email &&
        dadosUsuario.senha === senha
      ) {

        dadosUsuario.ultimoLogin = new Date().toISOString();

        await AsyncStorage.setItem(
          "dadosUsuario",
          JSON.stringify(dadosUsuario)
        );

        await AsyncStorage.setItem(
          "usuarioLogado",
          JSON.stringify(dadosUsuario)
        );

        alert("Login realizado com sucesso!");

        navigation.replace("Dashboard");

      } else {

        alert("E-mail ou senha incorretos.");

      }

    } catch (error) {

      console.log(error);
      alert("Erro ao realizar login.");

    } finally {

      setLoading(false);

    }

  };

  return (
    <View style={styles.container}>

      <Image
        source={require("../../../assets/img/secureBank-logo.png")}
        style={styles.img}
      />

      <Text style={styles.titulo}>LOGIN</Text>

      <View style={styles.formulario}>

        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoCapitalize="none"
        />

        <PrimaryButton
          title={loading ? "Entrando..." : "Entrar"}
          onPress={realizarLogin}
          disabled={loading}
        />

        <Pressable
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.cadastro}>
            Ainda não possui uma conta? Cadastre-se
          </Text>
        </Pressable>

      </View>

      <StatusBar style="light" />

    </View>
  );
}