import React from 'react';
import { View, Text } from 'react-native';

import estilos from './style';

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(dataIso) {
  return new Date(dataIso).toLocaleDateString('pt-BR');
}

export default function TransactionCard({ titulo, valor, tipo, data }) {
  const ehEntrada = tipo === 'entrada';
  const cor = ehEntrada ? '#22C55E' : '#EF4444';

  return (
    <View style={estilos.card}>
      <View style={estilos.info}>
        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.data}>{formatarData(data)}</Text>
      </View>

      <Text style={[estilos.valor, { color: cor }]}>
        {ehEntrada ? '+' : '-'}
        {formatarMoeda(Math.abs(valor))}
      </Text>
    </View>
  );
}