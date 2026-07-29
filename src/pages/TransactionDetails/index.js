import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { editarTransacao, excluirTransacao } from "../../services/storage";
import estilos from "./style";

const CATEGORIAS = ["PIX", "Mercado", "Assinatura", "Salário", "Outros"];
const TIPOS = [
  { valor: "entrada", label: "Entrada" },
  { valor: "saida", label: "Saída" },
];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(dataIso) {
  return new Date(dataIso).toLocaleDateString("pt-BR");
}

function Campo({ rotulo, valor }) {
  return (
    <View style={estilos.card}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={estilos.info}>{valor}</Text>
    </View>
  );
}

export default function TransactionDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const [transacao, setTransacao] = useState(route.params.transacao);
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const [form, setForm] = useState({
    valor: String(transacao.valor),
    descricao: transacao.descricao,
    categoria: transacao.categoria,
    tipo: transacao.tipo,
  });

  function atualizarForm(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  const ehEntrada = transacao.tipo === "entrada";
  const cor = ehEntrada ? "#22C55E" : "#EF4444";

  function handleEditar() {
    setForm({
      valor: String(transacao.valor),
      descricao: transacao.descricao,
      categoria: transacao.categoria,
      tipo: transacao.tipo,
    });
    setEditando(true);
  }

  async function handleSalvar() {
    const valorNumerico = Number(String(form.valor).replace(",", "."));

    if (!valorNumerico || valorNumerico <= 0) {
      Alert.alert("Valor inválido", "Informe um valor maior que zero.");
      return;
    }

    setSalvando(true);

    const resultado = await editarTransacao(transacao.id, {
      titulo: form.descricao || form.categoria,
      valor: valorNumerico,
      tipo: form.tipo,
      categoria: form.categoria,
      descricao: form.descricao || form.categoria,
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
          <TouchableOpacity onPress={() => setEditando(false)}>
            <Text style={estilos.setaVoltar}>{"‹"}</Text>
          </TouchableOpacity>
          <Text style={estilos.titulo}>Editar</Text>
          <Logo size={50} style={{ marginTop: 4 }} />
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Valor</Text>
          <Input
            keyboardType="numeric"
            value={form.valor}
            onChangeText={(texto) => atualizarForm("valor", texto)}
          />
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Descrição</Text>
          <Input
            value={form.descricao}
            onChangeText={(texto) => atualizarForm("descricao", texto)}
          />
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Categoria</Text>
          <View style={estilos.linhaCategorias}>
            {CATEGORIAS.map((item) => {
              const ativa = form.categoria === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[estilos.chipCategoria, ativa && estilos.chipCategoriaAtiva]}
                  onPress={() => atualizarForm("categoria", item)}
                >
                  <Text style={[estilos.textoChip, ativa && estilos.textoChipAtivo]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={estilos.card}>
          <Text style={estilos.rotulo}>Tipo</Text>
          <View style={estilos.linhaTipo}>
            {TIPOS.map(({ valor, label }) => {
              const ativo = form.tipo === valor;
              const estiloAtivo =
                valor === "entrada" ? estilos.botaoTipoEntradaAtivo : estilos.botaoTipoSaidaAtivo;

              return (
                <TouchableOpacity
                  key={valor}
                  style={[
                    estilos.botaoTipo,
                    valor === "saida" && { marginRight: 0 },
                    ativo && estiloAtivo,
                  ]}
                  onPress={() => atualizarForm("tipo", valor)}
                >
                  <Text style={[estilos.textoBotaoTipo, ativo && estilos.textoBotaoTipoAtivo]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={estilos.acoes}>
          <TouchableOpacity style={estilos.botaoEditar} onPress={() => setEditando(false)}>
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
        <Logo size={50} style={{ marginTop: 4 }} />
      </View>

      <View style={estilos.cardValor}>
        <Text style={estilos.nomeTransacao}>{transacao.titulo}</Text>
        <Text style={[estilos.valorGrande, { color: cor }]}>
          {ehEntrada ? "+" : "-"}
          {formatarMoeda(Math.abs(transacao.valor))}
        </Text>
      </View>

      <Campo rotulo="Categoria" valor={transacao.categoria} />
      <Campo rotulo="Descrição" valor={transacao.descricao} />
      <Campo rotulo="Tipo" valor={ehEntrada ? "Entrada" : "Saída"} />
      <Campo rotulo="Status" valor={transacao.status ?? "Concluída"} />
      <Campo rotulo="Data" valor={formatarData(transacao.data)} />
      <Campo rotulo="ID" valor={transacao.id} />

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