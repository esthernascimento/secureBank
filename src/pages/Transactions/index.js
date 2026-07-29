import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";


import TransactionCard from "../../components/TransactionCard";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import {
  obterTransacoes,
  obterUsuarioLogado,
  adicionarTransacao,
} from "../../services/storage";
import estilos from "./style";

const CATEGORIAS = ["PIX", "Mercado", "Assinatura", "Salário", "Outros"];
const TIPOS = [
  { valor: "entrada", label: "Entrada" },
  { valor: "saida", label: "Saída" },
];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Transactions() {
  const navigation = useNavigation();

  const [saldo, setSaldo] = useState(0);
  const [transacoes, setTransacoes] = useState([]);
  const [enviando, setEnviando] = useState(false);

  const [form, setForm] = useState({
    valor: "",
    descricao: "",
    categoria: CATEGORIAS[0],
    tipo: "entrada",
  });

  function atualizarForm(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  const carregarDados = async () => {
    const [listaTransacoes, usuario] = await Promise.all([
      obterTransacoes(),
      obterUsuarioLogado(),
    ]);
    setTransacoes(listaTransacoes);
    setSaldo(usuario?.saldo ?? 0);
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  async function handleAdicionar() {
    const valorNumerico = Number(form.valor.replace(",", "."));

    if (!valorNumerico || valorNumerico <= 0) {
      return;
    }

    setEnviando(true);

    const titulo = form.descricao || form.categoria;

    const { transacoes: novasTransacoes, usuario } = await adicionarTransacao({
      titulo,
      valor: valorNumerico,
      tipo: form.tipo,
      categoria: form.categoria,
      descricao: titulo,
    });

    setTransacoes(novasTransacoes);
    setSaldo(usuario?.saldo ?? saldo);

    setForm({ valor: "", descricao: "", categoria: form.categoria, tipo: "entrada" });
    setEnviando(false);
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={transacoes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.conteudo}
        ListHeaderComponent={
          <>
            <View style={estilos.cabecalho}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={estilos.setaVoltar}>{"‹"}</Text>
              </TouchableOpacity>
              <Text style={estilos.titulo}>Transações</Text>
              <Logo size={50} style={{ marginTop: 4 }} />
            </View>
            <View style={estilos.card}>
              <Text style={estilos.rotuloSaldo}>Saldo Atual</Text>
              <Text style={estilos.valorSaldo}>{formatarMoeda(saldo)}</Text>
            </View>

            <View style={estilos.formulario}>
              <Input
                placeholder="Valor"
                keyboardType="numeric"
                value={form.valor}
                onChangeText={(texto) => atualizarForm("valor", texto)}
              />
              <Input
                placeholder="Descrição"
                value={form.descricao}
                onChangeText={(texto) => atualizarForm("descricao", texto)}
              />

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

              <TouchableOpacity
                style={[estilos.botaoAdicionar, enviando && estilos.botaoAdicionarDesabilitado]}
                onPress={handleAdicionar}
                disabled={enviando}
              >
                <Text style={estilos.textoBotaoAdicionar}>Adicionar</Text>
              </TouchableOpacity>
            </View>

            <Text style={estilos.tituloHistorico}>Histórico</Text>
          </>
        }
        renderItem={({ item }) => (
          <TransactionCard
            titulo={item.titulo}
            valor={item.valor}
            tipo={item.tipo}
            data={item.data}
            onPress={() => navigation.navigate("TransactionDetails", { transacao: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={estilos.listaVazia}>
            Nenhuma transação ainda. Adicione a primeira acima.
          </Text>
        }
      />
    </KeyboardAvoidingView>
  );
}