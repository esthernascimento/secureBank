import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../components/Logo";

import { obterUsuarioLogado } from "../../services/storage";
import styles from "./style";

export default function Profile() {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState(null);
  const [biometria, setBiometria] = useState(false);
  const [notificacoes, setNotificacoes] = useState(false);

  const carregarPerfil = async () => {
    const dadosUsuario = await obterUsuarioLogado();
    if (dadosUsuario) {
      setUsuario(dadosUsuario);
      setBiometria(!!dadosUsuario.biometria);
      setNotificacoes(!!dadosUsuario.notificacoes);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarPerfil();
    }, [])
  );

  async function atualizarUsuario(campo, valor) {
    if (!usuario) return;

    const usuarioAtualizado = { ...usuario, [campo]: valor };
    setUsuario(usuarioAtualizado);
    await AsyncStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
  }

  function handleToggleBiometria(valor) {
    setBiometria(valor);
    atualizarUsuario("biometria", valor);
  }

  function handleToggleNotificacoes(valor) {
    setNotificacoes(valor);
    atualizarUsuario("notificacoes", valor);
  }

  function handleLogout() {
    Alert.alert(
      "Sair do Aplicativo",
      "Tem certeza que deseja encerrar sua sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("usuarioLogado");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.setaVoltar}>{"‹"}</Text>
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Perfil</Text>
        <Logo size={50} style={{ marginTop: 4 }} />
      </View>

      <View style={styles.cardAvatar}>
        <View style={styles.circleAvatar}>
          <Text style={styles.textoAvatar}>
            {usuario?.nome?.charAt(0).toUpperCase() ?? "U"}
          </Text>
        </View>
        <Text style={styles.nomeUsuario}>{usuario?.nome ?? "Usuário"}</Text>
        <Text style={styles.emailUsuario}>{usuario?.email ?? "email@exemplo.com"}</Text>
      </View>

      <Text style={styles.secaoTitulo}>Informações Pessoais</Text>

      <View style={styles.card}>
        <Text style={styles.rotulo}>CPF</Text>
        <Text style={styles.valor}>{usuario?.cpf ?? "—"}</Text>

        <Text style={styles.rotulo}>Score de Segurança</Text>
        <Text style={styles.valorDestaque}>{usuario?.scoreSeguranca ?? 0}%</Text>
      </View>

      <Text style={styles.secaoTitulo}>Configurações da Conta</Text>

      <View style={styles.card}>
        <View style={styles.linhaSwitch}>
          <View>
            <Text style={styles.rotuloOption}>Biometria / Face ID</Text>
            <Text style={styles.subOption}>Acesso rápido e seguro</Text>
          </View>
          <Switch
            value={biometria}
            onValueChange={handleToggleBiometria}
            trackColor={{ false: "#D1D1D6", true: "#22C55E" }}
            thumbColor="#FFF"
          />
        </View>

        <View style={[styles.linhaSwitch, { borderBottomWidth: 0 }]}>
          <View>
            <Text style={styles.rotuloOption}>Notificações</Text>
            <Text style={styles.subOption}>Alertas de movimentações</Text>
          </View>
          <Switch
            value={notificacoes}
            onValueChange={handleToggleNotificacoes}
            trackColor={{ false: "#D1D1D6", true: "#22C55E" }}
            thumbColor="#FFF"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Text style={styles.textoBotaoSair}>Encerrar Sessão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}