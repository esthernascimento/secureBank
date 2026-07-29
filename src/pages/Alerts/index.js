import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Logo from "../../components/Logo";

import AlertCard from "../../components/AlertCard";
import {
  obterAlertas,
  limparAlertas,
  marcarComoLido,
  excluirAlerta,
} from "../../services/storage";
import estilos from "./style";

export default function Alerts() {
  const navigation = useNavigation();
  const [alertas, setAlertas] = useState([]);

  const carregarAlertas = useCallback(async () => {
    const lista = await obterAlertas();
    setAlertas(lista);
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarAlertas();
    }, [carregarAlertas])
  );

  async function handleLimpar() {
    await limparAlertas();
    setAlertas([]);
  }

  async function handleMarcarLido(id) {
    const listaAtualizada = await marcarComoLido(id);
    if (listaAtualizada) setAlertas(listaAtualizada);
  }

  async function handleExcluir(id) {
    const listaAtualizada = await excluirAlerta(id);
    if (listaAtualizada) setAlertas(listaAtualizada);
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={alertas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={estilos.cabecalho}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={estilos.setaVoltar}>{"‹"}</Text>
            </TouchableOpacity>
            <Text style={estilos.titulo}>Alertas</Text>
            <Logo size={50} style={{ marginTop: 4 }} />
            {alertas.length > 0 && (
              <TouchableOpacity style={estilos.botaoLimparHeader} onPress={handleLimpar}>
                <Text style={estilos.textoLimparHeader}>Limpar tudo</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <AlertCard
            item={item}
            onPress={() => handleMarcarLido(item.id)}
            onExcluir={() => handleExcluir(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={estilos.listaVazia}>Nenhum alerta por enquanto.</Text>
        }
      />
    </View>
  );
}