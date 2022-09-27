import { createDrawerNavigator } from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "../home/Home";
import DrawerContainer from '../../components/Account/DrawerContainer'
import LogoTitle from '../../components/LogoTitle';
import LogoTitleRight from '../../components/LogoTitleRight';
const Drawer = createDrawerNavigator();


export default function Account({navigate}){
    const [user, setUser]=useState({nombre:''})
    
    useEffect(() => {
        (async () => {
            let jsonValue = await AsyncStorage.getItem('usuario')
            jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            setUser(jsonValue)
        })();
       }, []);

    return(
        <Drawer.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#0E035A' },
                headerTitleAlign: 'center'

            }}
            drawerContent={props=><DrawerContainer user={user}  {...props}/>}
        >
            <Drawer.Screen name="Home" component={Home} options={{title: `${user.nombre}`, headerTitle: (props) => <LogoTitle {...props} />, headerRight: (props) => <LogoTitleRight {...props} />    }}/>
        </Drawer.Navigator>
    )
}