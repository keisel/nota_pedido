import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet,  View, ImageBackground, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast, {DURATION} from 'react-native-easy-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../components/Logo';
import ButtonAccess from '../../components/ButtonAccess';


export default function AddConexion({navigation}) {
    const [text, onChangeText] = useState("");
    const toastRef = useRef();

    const storeData = async (value) => {
      try {
        //await AsyncStorage.removeItem('conexion')
        if(value!=''){
            let jsonValue = await AsyncStorage.getItem('conexion')
            jsonValue= jsonValue != null ? JSON.parse(jsonValue) : [];
            value={id:`${value}`, URL:`${value}`}
            jsonValue.push(value)
            jsonValue = JSON.stringify(jsonValue)
            await AsyncStorage.setItem('conexion', jsonValue)
            navigation.navigate('Login')
        }else{
            toastRef.current.show('Ingrese URL', 900)

        }
      } catch (e) {
        // saving error
      }
    }
  return (
    <View style={styles.container}>
        <ImageBackground source={ require('../../../assets/img/background.png')} resizeMode="cover" style={styles.imageBackground}>
            <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps={'handled'}> 
                <Logo/>
                <View style={{flex:1, justifyContent:'flex-end'}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholderTextColor='white'
                        placeholder="Ingrese URL"
                    />
                </View>
                <ButtonAccess text={'AGREGAR'} onPress={()=>storeData(text)}/>
                <Toast ref={toastRef} position='top' />
            </KeyboardAwareScrollView>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
      flex: 1,
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
     
})