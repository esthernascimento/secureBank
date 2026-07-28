import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
    flex:1,
    backgroundColor:"#242424",
    padding:25,
},

bemVindo:{
    color:"#BDBDBD",
    fontSize:16,
},

nome:{
    color:"#FFF",
    fontSize:32,
    fontWeight:"bold",
    marginBottom:28,
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
    fontSize:13,
    fontWeight:"600",
    letterSpacing:0.6,
    textTransform:"uppercase",
},

valor:{
    fontSize:34,
    fontWeight:"bold",
    marginTop:8,
    letterSpacing:-0.5,
    color:"#111",
},

info:{
    fontSize:16,
    marginTop:8,
    color:"#333",
    lineHeight:22,
},

valorPequeno:{
    fontSize:16,
    fontWeight:"600",
    color:"#111",
    marginTop:2,
    marginBottom:10,
},

status:{
    marginTop:30,
    alignItems:"center",
},

statusText:{
    color:"#22C55E",
    fontWeight:"bold",
    fontSize:18,
    marginBottom:40,
}

});