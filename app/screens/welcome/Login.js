import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View,  ImageBackground,TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast'
import ButtonAccess from '../../components/ButtonAccess';
import ButtonResetPassword from '../../components/ButtonResetPassword';
import InputLogin from '../../components/InputLogin';
import Logo from '../../components/Logo'
import MenuConexion from '../../components/MenuConexion';
import MenuAddConexion from '../../components/MenuAddConexion';
import MenuVersion from '../../components/MenuVersion';
export default function LoginScreen({ navigation }) {
    const [array,setArray]=useState([])
    const toastRef = useRef();
    const [user, onChangeUser] =useState("");
    const [password, onChangePassword] = useState("");
    const [dominio, setDominio] = useState("");
    const [version, setVersion]=useState('PROD')
    const [arrayVersion,setArrayVersion]=useState([{version:'PROD',id:'1'},{version:'QA',id:'2'}])

    const isFocused = useIsFocused();

    const login = async () => {
      if(user!='' && password!='' && dominio!=''){
        const bodyParameters = {
          dominio,
          usuario:user,
          password
       };

       let apiUrl=null
       if(version==='PROD'){ 
          apiUrl='https://api.primetec.cl/autenticacion/dominio/login'
       }else{
          apiUrl='https://apiqa.primetec.cl/autenticacion/dominio/login'
       }

       axios.post(`${apiUrl}`,bodyParameters)
        .then(response => {
            validaToken(response.data,dominio,version)
        })
       .catch(error=>{
          console.log('error',error)
          toastRef.current.show('Error de conexión', 900)
       });

         
      }else{
        toastRef.current.show('Faltan Datos', 900)
      }
    }
    const validaToken=async(sesion,dominio,ambiente)=>{
      const config = {
        headers: { 
          Authorization: `Bearer ${sesion.token_sesion}`,
          'x-dominio':dominio
        }
      };

      let apiUrl=null
      if(ambiente==='PROD'){ 
         apiUrl='https://api.primetec.cl/autenticacion/dominio/user/me'
      }else{
        apiUrl='https://apiqa.primetec.cl/autenticacion/dominio/user/me'
      }

      let jsonValue = JSON.stringify(ambiente)
      await AsyncStorage.setItem('version',jsonValue)

      axios.get(`${apiUrl}`,config)
        .then(async response => {
          goHome(response.data,sesion,dominio)
        })
        .catch(error=>{
          console.log('error',error.message)
          toastRef.current.show('Error de conexión', 900)
        });
    }

    const goHome=async(user,sesion,dominio)=>{
      let jsonValue = JSON.stringify(user)
      await AsyncStorage.setItem('usuario',jsonValue)
      jsonValue = JSON.stringify({id_conexión:`${sesion.id_conexión}`,token_sesion:`${sesion.token_sesion}`,dominio:`${dominio}`})
      await AsyncStorage.setItem('login',jsonValue)

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Account'
          }
        ]
    });
    }

    useEffect(() => {
      (async()=>{
        if(isFocused){
          let jsonValue = await AsyncStorage.getItem('conexion')
          jsonValue= jsonValue != null ? JSON.parse(jsonValue) : [];
          if(jsonValue.length>0){
            setDominio(jsonValue[jsonValue.length-1].URL)
          }
          setArray(jsonValue);        
        }
      })();
    }, [isFocused])
 
      
    return (
      <View style={styles.container}>
         <ImageBackground source={ require('../../../assets/img/background.png')} resizeMode="cover" style={styles.container}>
            <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
             
              <Logo/>
              <MenuConexion array={array} onPress={login} dominio={dominio} setDominio={setDominio} />
              <InputLogin user={user} onChangeUser={onChangeUser} onChangePassword={onChangePassword} password={password}/>     
              <ButtonAccess text={'INGRESAR'} onPress={login}/>       
              <MenuAddConexion navigation={navigation} />
              <ButtonResetPassword navigation={navigation}/>
              <MenuVersion version={version} setVersion={setVersion} arrayVersion={arrayVersion}/>

              <Toast ref={toastRef} position='center' />
            </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
  