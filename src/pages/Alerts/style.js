import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  
  conteudo: {
    padding: 25,
    paddingBottom: 40,
    marginTop: 30,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
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
    flex: 1,
  },

  botaoLimparHeader: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#333",
    borderRadius: 12,
  },

  textoLimparHeader: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "bold",
  },

  listaVazia: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },
});