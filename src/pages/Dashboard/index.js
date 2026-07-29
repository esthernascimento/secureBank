import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../../components/Logo";
import styles from "./style";

function formatarMoeda(valor) {
  return (valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Dashboard() {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState(null);
  const [quantidadeTransacoes, setQuantidadeTransacoes] = useState(0);
  const [quantidadeAlertas, setQuantidadeAlertas] = useState(0);
  const [loading, setLoading] = useState(true);

  const carregarDashboard = async () => {
    try {
      const usuario = JSON.parse(
        (await AsyncStorage.getItem("usuarioLogado")) || "{}"
      );
      setUsuario(usuario);

      const transacoes = JSON.parse(
        (await AsyncStorage.getItem("transacoes")) || "[]"
      );
      setQuantidadeTransacoes(transacoes.length);

      const alertas = JSON.parse(
        (await AsyncStorage.getItem("alertas")) || "[]"
      );
      setQuantidadeAlertas(alertas.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDashboard();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.textoLoading}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.bemVindo}>Olá,</Text>
          <Text style={styles.nome}>{usuario?.nome ?? "Usuário"} 👋</Text>
        </View>

        <Logo size={50} style={{ marginTop: 4 }} />
      </View>

      <View style={styles.cardDestaque}>
        <Text style={styles.tituloDestaque}>Saldo disponível</Text>
        <Text style={styles.valorDestaque}>{formatarMoeda(usuario?.saldo)}</Text>
      </View>

      <Text style={styles.secaoTitulo}>Acesso Rápido</Text>

      <View style={styles.gridAcoes}>
        <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate("Transactions")}>
          <Image source={require("../../../assets/img/invest.png")} style={styles.iconeAcao} />
          <Text style={styles.textoAcao}>Transações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate("Alerts")}>
          <Image source={require("../../../assets/img/sino.png")} style={styles.iconeAcao} />
          <Text style={styles.textoAcao}>Alertas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../../../assets/img/perfil.png")} style={styles.iconeAcao} />
          <Text style={styles.textoAcao}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secaoTitulo}>Métricas da Conta</Text>

      <View style={styles.linhaCards}>
        <View style={styles.cardMeio}>
          <Text style={styles.titulo}>Transações</Text>
          <Text style={styles.valorNumero}>{quantidadeTransacoes}</Text>
          <Text style={styles.subtexto}>Registradas</Text>
        </View>

        <View style={styles.cardMeio}>
          <Text style={styles.titulo}>Alertas</Text>
          <Text style={styles.valorNumero}>{quantidadeAlertas}</Text>
          <Text style={styles.subtexto}>Notificações</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>Segurança da Conta</Text>

        <View style={styles.linhaInfo}>
          <Text style={styles.infoRotulo}>Score de Proteção</Text>
          <Text style={styles.infoDestaque}>{usuario?.scoreSeguranca ?? 0}%</Text>
        </View>

        <View style={styles.linhaInfo}>
          <Text style={styles.infoRotulo}>Biometria</Text>
          <Text style={styles.infoValor}>{usuario?.biometria ? "Ativada" : "Desativada"}</Text>
        </View>

        <View style={styles.linhaInfo}>
          <Text style={styles.infoRotulo}>Notificações</Text>
          <Text style={styles.infoValor}>{usuario?.notificacoes ? "Ativadas" : "Desativadas"}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>Dados do Titular</Text>

        <Text style={styles.rotuloPequeno}>CPF</Text>
        <Text style={styles.valorPequeno}>{usuario?.cpf ?? "—"}</Text>

        <Text style={styles.rotuloPequeno}>Email</Text>
        <Text style={styles.valorPequeno}>{usuario?.email ?? "—"}</Text>

        <Text style={styles.rotuloPequeno}>Último Acesso</Text>
        <Text style={styles.valorPequeno}>
          {usuario?.ultimoLogin
            ? new Date(usuario.ultimoLogin).toLocaleString("pt-BR")
            : "Primeiro acesso"}
        </Text>
      </View>
    </ScrollView>
  );
}