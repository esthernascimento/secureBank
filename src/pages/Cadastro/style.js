import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424', 
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },

  titulo: {
    color: '#FFFFFF',          
    fontSize: 28,             
    fontWeight: 'bold',       
    textAlign: 'center',       
    letterSpacing: 2,        
    marginVertical: 20,      
  },

  formulario: {
    width: "85%",
    alignItems: 'center',
  },

  cadastro: {
    color: "#BDBDBD",
    marginTop: 25,
    fontSize: 15,
    textAlign: "center",
  },
});