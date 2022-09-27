import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ButtonResetPassword({navigation}) {
  return (
    <View style={styles.container}>   
        <Text
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Reset")}
        > 
          ¿Olvidó su contraseña?
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
        color: "#cccc",
        fontWeight: "bold",
        alignSelf:'center',
        marginTop:20
    },
})