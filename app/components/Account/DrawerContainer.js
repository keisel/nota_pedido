import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import {DrawerContentScrollView}  from '@react-navigation/drawer'
import {Icon, Avatar } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerContainer(props) {
    const {navigation,user}=props
    const home=()=>{
        navigation.navigate("Home")
    }
  
    async function logout(){
        await AsyncStorage.removeItem('usuario')
        navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Login'
              }
            ]
        });
      }
   
   
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <View style={styles.viewUserInfo}>
                <Avatar
                    rounded
                    size="medium"
                    source={require('../../../assets/img/perfil.png')}
                />
                <View>
                    <Text style={styles.displayName}>
                        {user.nombre}
                    </Text>
                    <Text style={styles.displayName}>{user.nombre_usuario}</Text>
                </View>
            </View>
                <TouchableOpacity  style={{marginTop:20, marginLeft:20}} onPress={()=>home()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon 
                        type="material-community"
                        name="home"
                        color="#008FEB"
                        size={30}
                        containerStyle={{marginTop:-3, marginRight:15}}
                        />
                        <Text style={styles.textMenu} >Home</Text>  
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  style={{marginTop:25,  marginLeft:20}} onPress={()=>logout()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon 
                        type="material-community"
                        name="logout-variant"
                        color="#d9534f"
                        size={30}
                        containerStyle={{marginTop:-3, marginRight:15}}
                        />
                        <Text style={{color:"#d9534f"}}>Cerrar Sesión</Text>  
                    </View>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
      justifyContent:"flex-start",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor:"white",
      paddingTop: 20,
      marginLeft: 15,
    },
    userInfoAvatar: {
      marginRight: 20,
    },
    displayName: {
      marginLeft: 10,
    },
    textMenu:{
        marginTop:4
    }
    
})
