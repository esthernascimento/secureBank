import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";

import styles from "./style";

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const salvarDados = async () => {
    if (!nome || !email || !cpf || !senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    const novoUsuario = {
      id: Date.now(),

      nome,
      email,
      cpf,
      senha,

      saldo: 0,
      biometria: false,
      notificacoes: true,
      ultimoLogin: null,
      contaProtegida: true,
      scoreSeguranca: 100,
      fotoPerfil: null,

      dataCadastro: new Date().toISOString(),
    };

    setLoading(true);

    try {

      await AsyncStorage.setItem(
        "dadosUsuario",
        JSON.stringify(novoUsuario)
      );

      await AsyncStorage.setItem(
        "transacoes",
        JSON.stringify([])
      );

      await AsyncStorage.setItem(
        "alertas",
        JSON.stringify([])
      );

      alert("Cadastro realizado com sucesso!");

      navigation.navigate("Login");
    } catch (error) {
      alert("Erro ao salvar os dados.");
      console.log(error);
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

      <Text style={styles.titulo}>CADASTRO</Text>

      <View style={styles.formulario}>
        <Input
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          autoCapitalize="none"
        />
        <Input
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoCapitalize="none"
        />

        <Input
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          autoCapitalize="none"
        />

        <PrimaryButton
          title={loading ? "Cadastrando..." : "Cadastrar"}
          onPress={salvarDados}
          disabled={loading}
        />

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.cadastro}>
            Já tem cadastro? Fazer Login
          </Text>
        </Pressable>
      </View>

      <StatusBar style="light" />
    </View>
  );
}