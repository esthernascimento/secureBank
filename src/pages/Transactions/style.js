import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#242424",
  },

  conteudo: {
    padding: 25,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  setaVoltar: {
    color: "#FFF",
    fontSize: 28,
    marginRight: 10,
  },

  titulo: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  rotuloSaldo: {
    color: "#888",
    fontSize: 15,
  },

  valorSaldo: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 10,
  },

  formulario: {
    marginBottom: 10,
  },

  linhaCategorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
  },

  chipCategoria: {
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },

  chipCategoriaAtiva: {
    backgroundColor: "#FFF",
  },

  textoChip: {
    color: "#BDBDBD",
    fontSize: 13,
  },

  textoChipAtivo: {
    color: "#242424",
    fontWeight: "bold",
  },

  linhaTipo: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 25,
  },

  botaoTipo: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 10,
  },

  botaoTipoEntradaAtivo: {
    backgroundColor: "#22C55E",
  },

  botaoTipoSaidaAtivo: {
    backgroundColor: "#EF4444",
  },

  textoBotaoTipo: {
    color: "#BDBDBD",
    fontSize: 15,
    fontWeight: "bold",
  },

  textoBotaoTipoAtivo: {
    color: "#FFF",
  },

  tituloHistorico: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  listaVazia: {
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },

  botaoAdicionar: {
    backgroundColor: "#22C55E",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  botaoAdicionarDesabilitado: {
    opacity: 0.6,
  },

  textoBotaoAdicionar: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

});