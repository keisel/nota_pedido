import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function LogoTitle(props) {
  return (
    <View style={{flexDirection:'row', flex:1,}}>
            <Text style={{color:'white', marginTop:8,fontSize:18}}>{props.children}</Text>       
    </View> 
  )
}

const styles = StyleSheet.create({})