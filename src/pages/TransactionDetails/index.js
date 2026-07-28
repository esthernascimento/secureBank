import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Input from "../../components/Input";
import { editarTransacao, excluirTransacao } from "../../services/storage";
import estilos from "./style";

const CATEGORIAS = ["PIX", "Mercado", "Assinatura", "Salário", "Outros"];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(dataIso) {
  return new Date(dataIso).toLocaleDateString("pt-BR");
}

export default function TransactionDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const [transacao, setTransacao] = useState(route.params.transacao);
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const [valor, setValor] = useState(String(transacao.valor));
  const [descricao, setDescricao] = useState(transacao.descricao);
  const [categoria, setCategoria] = useState(transacao.categoria);
  const [tipo, setTipo] = useState(transacao.tipo);

  const ehEntrada = transacao.tipo === "entrada";
  const cor = ehEntrada ? "#22C55E" : "#EF4444";

  function handleEditar() {
    setValor(String(transacao.valor));
    setDescricao(transacao.descricao);
    setCategoria(transacao.categoria);
    setTipo(transacao.tipo);
    setEditando(true);
  }

  function handleCancelar() {
    setEditando(false);
  }

  async function handleSalvar() {
    const valorNumerico = Number(String(valor).replace(",", "."));

    if (!valorNumerico || valorNumerico <= 0) {
      Alert.alert("Valor inválido", "Informe um valor maior que zero.");
      return;
    }

    setSalvando(true);

    const resultado = await editarTransacao(transacao.id, {
      titulo: descricao || categoria,
      valor: valorNumerico,
      tipo,
      categoria,
      descricao: descricao || categoria,
    });

    setSalvando(false);

    if (resultado?.transacao) {
      setTransacao(resultado.transacao);
      setEditando(false);
    }
  }

  function handleExcluir() {
    Alert.alert(
      "Excluir transação",
      "Tem certeza que deseja excluir essa transação? O saldo será ajustado automaticamente.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setExcluindo(true);
            await excluirTransacao(transacao.id);
            setExcluindo(false);
            navigation.goBack();
          },
        },
      ]
    );
  }

  if (editando) {
    return (
      <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
        <View style={estilos.cabecalho}>
          <TouchableOpacity onPress={handleCancelar}>
            <Text style={estilos.setaVoltar}>{"‹"}</Text>
          </TouchableOpacity>
          <Text style={estilos.titulo}>Editar</Text>
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Valor</Text>
          <Input
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Descrição</Text>
          <Input value={descricao} onChangeText={setDescricao} />
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Categoria</Text>
          <View style={estilos.linhaCategorias}>
            {CATEGORIAS.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  estilos.chipCategoria,
                  categoria === item && estilos.chipCategoriaAtiva,
                ]}
                onPress={() => setCategoria(item)}
              >
                <Text
                  style={[
                    estilos.textoChip,
                    categoria === item && estilos.textoChipAtivo,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Tipo</Text>
          <View style={estilos.linhaTipo}>
            <TouchableOpacity
              style={[
                estilos.botaoTipo,
                tipo === "entrada" && estilos.botaoTipoEntradaAtivo,
              ]}
              onPress={() => setTipo("entrada")}
            >
              <Text
                style={[
                  estilos.textoBotaoTipo,
                  tipo === "entrada" && estilos.textoBotaoTipoAtivo,
                ]}
              >
                Entrada
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                estilos.botaoTipo,
                { marginRight: 0 },
                tipo === "saida" && estilos.botaoTipoSaidaAtivo,
              ]}
              onPress={() => setTipo("saida")}
            >
              <Text
                style={[
                  estilos.textoBotaoTipo,
                  tipo === "saida" && estilos.textoBotaoTipoAtivo,
                ]}
              >
                Saída
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={estilos.acoes}>
          <TouchableOpacity style={estilos.botaoEditar} onPress={handleCancelar}>
            <Text style={estilos.textoBotao}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.botaoSalvar, salvando && { opacity: 0.6 }]}
            onPress={handleSalvar}
            disabled={salvando}
          >
            <Text style={estilos.textoBotao}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={estilos.setaVoltar}>{"‹"}</Text>
        </TouchableOpacity>
        <Text style={estilos.titulo}>Transação</Text>
      </View>

      <View style={estilos.cardValor}>
        <Text style={estilos.nomeTransacao}>{transacao.titulo}</Text>
        <Text style={[estilos.valorGrande, { color: cor }]}>
          {ehEntrada ? "+" : "-"}
          {formatarMoeda(Math.abs(transacao.valor))}
        </Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.rotulo}>Categoria</Text>
        <Text style={estilos.info}>{transacao.categoria}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.rotulo}>Descrição</Text>
        <Text style={estilos.info}>{transacao.descricao}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.rotulo}>Tipo</Text>
        <Text style={estilos.info}>{ehEntrada ? "Entrada" : "Saída"}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.rotulo}>Status</Text>
        <Text style={estilos.info}>{transacao.status ?? "Concluída"}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.rotulo}>Data</Text>
        <Text style={estilos.info}>{formatarData(transacao.data)}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.rotulo}>ID</Text>
        <Text style={estilos.info}>{transacao.id}</Text>
      </View>

      <View style={estilos.acoes}>
        <TouchableOpacity style={estilos.botaoEditar} onPress={handleEditar}>
          <Text style={estilos.textoBotao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.botaoExcluir, excluindo && { opacity: 0.6 }]}
          onPress={handleExcluir}
          disabled={excluindo}
        >
          <Text style={estilos.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}