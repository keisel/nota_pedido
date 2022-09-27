import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function LogoTitleRight() {
      return (
        <View style={{ flex:1,marginTop:5, marginRight:12}}>
                <Image
                    style={{ width: 35, height: 35 }}
                    source={require('../../assets/img/icon-logo.png')}
                />
        </View> 
      )
}

const styles = StyleSheet.create({})