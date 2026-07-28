import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import estilos from "./style";

function formatarDataHora(dataIso) {
  if (!dataIso) return "";
  const data = new Date(dataIso);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AlertCard({ item, onPress, onExcluir }) {
  const { titulo, descricao, tipo, data, lido } = item;

  const corTipo =
    tipo === "sucesso" || tipo === "entrada"
      ? "#22C55E"
      : tipo === "saida"
      ? "#EF4444"
      : "#333";

  return (
    <TouchableOpacity
      style={[estilos.card, !lido && estilos.cardNaoLido]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={estilos.linhaTopo}>
        <View style={estilos.indicadorTitulo}>
          <View style={[estilos.pontoStatus, { backgroundColor: corTipo }]} />
          <Text style={estilos.titulo}>{titulo}</Text>
        </View>
        <Text style={estilos.data}>{formatarDataHora(data)}</Text>
      </View>

      <Text style={estilos.descricao}>{descricao}</Text>

      <View style={estilos.rodape}>
        <Text style={[estilos.statusLido, !lido && estilos.statusNaoLido]}>
          {lido ? "Lido" : "• Novo"}
        </Text>

        <TouchableOpacity onPress={onExcluir} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={estilos.textoExcluir}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}