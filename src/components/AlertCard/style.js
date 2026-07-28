import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  cardNaoLido: {
    borderLeftWidth: 4,
    borderLeftColor: "#22C55E",
  },

  linhaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  indicadorTitulo: {
    flexDirection: "row",
    alignItems: "center",
  },

  pontoStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  titulo: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },

  data: {
    color: "#888",
    fontSize: 12,
  },

  descricao: {
    color: "#555",
    fontSize: 14,
    marginBottom: 12,
    marginTop: 2,
  },

  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 10,
  },

  statusLido: {
    color: "#888",
    fontSize: 12,
  },

  statusNaoLido: {
    color: "#22C55E",
    fontWeight: "bold",
  },

  textoExcluir: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
  },
});