import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },

  conteudo: {
    padding: 25,
    paddingTop: 50,
    paddingBottom: 40,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  setaVoltar: {
    color: "#FFF",
    fontSize: 28,
    marginRight: 10,
  },

  tituloHeader: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
  },

  cardAvatar: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  circleAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#242424",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  textoAvatar: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  nomeUsuario: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  emailUsuario: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },

  secaoTitulo: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  rotulo: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginTop: 4,
  },

  valor: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginTop: 4,
    marginBottom: 12,
  },

  valorDestaque: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22C55E",
    marginTop: 4,
  },

  linhaSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  rotuloOption: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },

  subOption: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  botaoSair: {
    backgroundColor: "#EF4444",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotaoSair: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});