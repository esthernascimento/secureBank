import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#242424",
  },

  conteudo: {
    padding: 25,
    paddingBottom: 40,
    marginTop: 30
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
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

  cardValor: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 24,
    marginTop: 10,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  nomeTransacao: {
    color: "#888",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  valorGrande: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  rotulo: {
    color: "#888",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  info: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
    marginTop: 8,
  },

  acoes: {
    flexDirection: "row",
    marginTop: 20,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginRight: 10,
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  botaoSalvar: {
    flex: 1,
    backgroundColor: "#22C55E",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  linhaCategorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  chipCategoria: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },

  chipCategoriaAtiva: {
    backgroundColor: "#242424",
  },

  textoChip: {
    color: "#666",
    fontSize: 13,
  },

  textoChipAtivo: {
    color: "#FFF",
    fontWeight: "bold",
  },

  linhaTipo: {
    flexDirection: "row",
    marginTop: 10,
  },

  botaoTipo: {
    flex: 1,
    backgroundColor: "#F0F0F0",
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
    color: "#666",
    fontSize: 15,
    fontWeight: "bold",
  },

  textoBotaoTipoAtivo: {
    color: "#FFF",
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

});