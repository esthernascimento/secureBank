import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../../components/Logo";
import PrimaryButton from "../../components/PrimaryButton";

import styles from "./style";

export default function Dashboard() {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState(null);
  const [quantidadeTransacoes, setQuantidadeTransacoes] = useState(0);
  const [quantidadeAlertas, setQuantidadeAlertas] = useState(0);
  const [loading, setLoading] = useState(true);

  const carregarDashboard = useCallback(async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem("usuarioLogado");

      if (usuarioSalvo) {
        setUsuario(JSON.parse(usuarioSalvo));
      }

      const transacoes = await AsyncStorage.getItem("transacoes");

      if (transacoes) {
        setQuantidadeTransacoes(JSON.parse(transacoes).length);
      }

      const alertas = await AsyncStorage.getItem("alertas");

      if (alertas) {
        setQuantidadeAlertas(JSON.parse(alertas).length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDashboard();
    }, [carregarDashboard])
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#242424",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />

        <Text
          style={{
            color: "#fff",
            marginTop: 15,
          }}
        >
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Logo size={90} />

      <Text style={styles.bemVindo}>Olá,</Text>

      <Text style={styles.nome}>
        {usuario ? usuario.nome : "Usuário"} 👋
      </Text>

      {/* Saldo */}

      <View style={styles.card}>
        <Text style={styles.titulo}>Saldo disponível</Text>

        <Text style={styles.valor}>
          R$ {usuario ? usuario.saldo.toFixed(2) : "0,00"}
        </Text>
      </View>

      {/* Segurança */}

      <View style={styles.card}>
        <Text style={styles.titulo}>Segurança da Conta</Text>

        <Text style={styles.info}>
          Score: {usuario ? usuario.scoreSeguranca : 0}%
        </Text>

        <Text style={styles.info}>
          Biometria:
          {usuario?.biometria ? " Ativada" : " Desativada"}
        </Text>

        <Text style={styles.info}>
          Notificações:
          {usuario?.notificacoes ? " Ativadas" : " Desativadas"}
        </Text>
      </View>

      {/* Resumo */}

      <View style={styles.card}>
        <Text style={styles.titulo}>Resumo</Text>

        <Text style={styles.info}>
          Transações: {quantidadeTransacoes}
        </Text>

        <Text style={styles.info}>
          Alertas: {quantidadeAlertas}
        </Text>
      </View>

      {/* Informações */}

      <View style={styles.card}>
        <Text style={styles.titulo}>Informações da Conta</Text>

        <Text style={styles.info}>CPF</Text>

        <Text style={styles.valorPequeno}>
          {usuario?.cpf}
        </Text>

        <Text style={styles.info}>Email</Text>

        <Text style={styles.valorPequeno}>
          {usuario?.email}
        </Text>
      </View>

      {/* Último acesso */}

      <View style={styles.card}>
        <Text style={styles.titulo}>Último acesso</Text>

        <Text style={styles.info}>
          {usuario?.ultimoLogin
            ? new Date(usuario.ultimoLogin).toLocaleString("pt-BR")
            : "Primeiro acesso"}
        </Text>
      </View>

      <PrimaryButton
        title="Transações"
        onPress={() => navigation.navigate("Transactions")}
      />

      <PrimaryButton
        title="Alertas"
        onPress={() => navigation.navigate("Alerts")}
      />

      <PrimaryButton
        title="Perfil"
        onPress={() => navigation.navigate("Profile")}
      />
    </ScrollView>
  );
}