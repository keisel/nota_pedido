import { Text, View,ActivityIndicator } from 'react-native'
import React, {useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Login';
import Account from '../home/Account';
export default function Main({navigation}) {
    const [login, setLogin] = useState(null);

    useEffect(() => {
        (async()=>{
            const token = await AsyncStorage.getItem('usuario');
            if (token !== null) {
                setLogin(true)
            }else{
                setLogin(false)
            }
        })();
    }, [])
    if (login === null) {
        return( 
            <View style={{flex:1, backgroundColor:'#0E035A',justifyContent:'center'}}>
                <ActivityIndicator style={{}} size="large" />
                <Text style={{color:'white', alignSelf:'center', fontSize:15}}>Cargando</Text>
            </View>
        )
    }
   
    return login ? <Account /> : <LoginScreen  navigation={navigation}/>;
}




