import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonAccess({onPress, text}) {
  return (
    <View style={styles.container}>   
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text>{text}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-end'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#8C52FF",
        paddingLeft: 100,
        paddingRight:100,
        paddingTop:15,
        paddingBottom:15,
        borderRadius:20,
        marginLeft:40,
        marginRight:40,
        marginTop:15
    },
})