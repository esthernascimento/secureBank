import React, { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import TransactionCard from "../../components/TransactionCard";
import Input from "../../components/Input";
import {
  obterTransacoes,
  obterUsuarioLogado,
  adicionarTransacao,
} from "../../services/storage";
import estilos from "./style";

const CATEGORIAS = ["PIX", "Mercado", "Assinatura", "Salário", "Outros"];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Transactions() {
  const navigation = useNavigation();

  const [saldo, setSaldo] = useState(0);
  const [transacoes, setTransacoes] = useState([]);

  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [tipo, setTipo] = useState("entrada");
  const [enviando, setEnviando] = useState(false);

  const carregarDados = useCallback(async () => {
    const [listaTransacoes, usuario] = await Promise.all([
      obterTransacoes(),
      obterUsuarioLogado(),
    ]);
    setTransacoes(listaTransacoes);
    setSaldo(usuario?.saldo ?? 0);
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  async function handleAdicionar() {
    const valorNumerico = Number(valor.replace(",", "."));

    if (!valorNumerico || valorNumerico <= 0) {
      return;
    }

    setEnviando(true);

    const titulo = descricao || categoria;

    const { transacoes: novasTransacoes, usuario } = await adicionarTransacao({
      titulo,
      valor: valorNumerico,
      tipo,
      categoria,
      descricao: titulo,
    });

    setTransacoes(novasTransacoes);
    setSaldo(usuario?.saldo ?? saldo);

    setValor("");
    setDescricao("");
    setTipo("entrada");
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
            </View>

            <View style={estilos.card}>
              <Text style={estilos.rotuloSaldo}>Saldo Atual</Text>
              <Text style={estilos.valorSaldo}>{formatarMoeda(saldo)}</Text>
            </View>

            <View style={estilos.formulario}>
              <Input
                placeholder="Valor"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
              />
              <Input
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
              />

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

              <TouchableOpacity
                style={[
                  estilos.botaoAdicionar,
                  enviando && estilos.botaoAdicionarDesabilitado,
                ]}
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