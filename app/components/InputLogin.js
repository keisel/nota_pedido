import React, {useState} from 'react'
import { StyleSheet, View, TextInput, } from 'react-native';
import {Icon } from "@rneui/themed";

export default function InputLogin({user,onChangeUser,password,onChangePassword}) {
    const [hidePassword, setHidePassword]=useState(true)
    return (
      <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUser}
            value={user}
            placeholderTextColor='white'
            placeholder="Usuario"
          />
          <TextInput
            style={styles.input}
            secureTextEntry={hidePassword}
            placeholderTextColor='white'
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"  
          />
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'flex-end'
    },
   
    input: {
      height: 55,
      margin: 12,
      marginLeft:40,
      marginRight:40,
      borderWidth: 0,
      padding: 10,
      borderRadius:20,
      color:'white',
      backgroundColor:'#251E56',
    },
  
  });
    