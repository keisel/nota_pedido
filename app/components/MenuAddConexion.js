import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MenuAddConexion({navigation, array}) {
  return (
    <View style={styles.container}>   
        <Text
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Conexion")}
        > 
          Agregar Conexión 
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:'flex-end'
},
btnRegister: {
    color: "white",
    alignSelf:'center',
    marginTop:20
},
})