import React from 'react'
import { View, Image,StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.container}>
       <Image
           style={styles.logo}
           source={require('../../assets/img/icon.png')}
       />
    </View>
  )
}
const styles= StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center'
    },
    logo:{
        width:200,
        height:200,
        marginRight:5,
        marginTop:100,
    
    },
})