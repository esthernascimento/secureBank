import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
    flex:1,
    backgroundColor:"#242424",
},

conteudo:{
    padding:25,
    paddingTop:50,
    paddingBottom:40,
},

containerLoading:{
    flex:1,
    backgroundColor:"#242424",
    justifyContent:"center",
    alignItems:"center",
},

textoLoading:{
    color:"#FFF",
    marginTop:15,
},

cabecalho:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:24,
},

bemVindo:{
    color:"#BDBDBD",
    fontSize:15,
},

nome:{
    color:"#FFF",
    fontSize:26,
    fontWeight:"bold",
},

cardDestaque:{
    backgroundColor:"#FFF",
    borderRadius:20,
    padding:22,
    marginBottom:24,
    shadowColor:"#000",
    shadowOffset:{ width: 0, height: 4 },
    shadowOpacity:0.15,
    shadowRadius:10,
    elevation:4,
},

tituloDestaque:{
    color:"#888",
    fontSize:13,
    fontWeight:"600",
    letterSpacing:0.6,
    textTransform:"uppercase",
},

valorDestaque:{
    fontSize:34,
    fontWeight:"bold",
    marginTop:8,
    color:"#111",
    letterSpacing:-0.5,
},

secaoTitulo:{
    color:"#FFF",
    fontSize:16,
    fontWeight:"bold",
    marginBottom:12,
},

gridAcoes:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:24,
    gap: 10,
},

botaoAcao:{
    flex:1,
    backgroundColor:"#333",
    borderRadius:16,
    paddingVertical:16,
    alignItems:"center",
    // marginRight:10,
},

iconeAcao: {
    width: 45,             
    height: 45,           
    resizeMode: 'contain',
    marginBottom: 6,
},

textoAcao:{
    color:"#FFF",
    fontSize:13,
    fontWeight:"600",
},

linhaCards:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:16,
},

cardMeio:{
    flex:1,
    backgroundColor:"#FFF",
    borderRadius:18,
    padding:16,
    marginRight:10,
    shadowColor:"#000",
    shadowOffset:{ width: 0, height: 4 },
    shadowOpacity:0.12,
    shadowRadius:8,
    elevation:3,
},

valorNumero:{
    fontSize:28,
    fontWeight:"bold",
    color:"#111",
    marginTop:4,
},

subtexto:{
    color:"#888",
    fontSize:12,
    marginTop:2,
},

card:{
    backgroundColor:"#FFF",
    borderRadius:18,
    padding:20,
    marginBottom:16,
    shadowColor:"#000",
    shadowOffset:{ width: 0, height: 4 },
    shadowOpacity:0.15,
    shadowRadius:10,
    elevation:4,
},

titulo:{
    color:"#888",
    fontSize:12,
    fontWeight:"600",
    letterSpacing:0.6,
    textTransform:"uppercase",
    marginBottom:12,
},

linhaInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:10,
},

infoRotulo:{
    fontSize:14,
    color:"#555",
},

infoValor:{
    fontSize:14,
    fontWeight:"600",
    color:"#111",
},

infoDestaque:{
    fontSize:14,
    fontWeight:"bold",
    color:"#22C55E",
},

rotuloPequeno:{
    fontSize:12,
    color:"#888",
    marginTop:6,
},

valorPequeno:{
    fontSize:15,
    fontWeight:"600",
    color:"#111",
    marginBottom:6,
}

});