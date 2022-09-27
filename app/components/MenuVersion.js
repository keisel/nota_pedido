import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

export default function MenuVersion({arrayVersion,version, setVersion}) {

  const changeVersion=async(item)=>{
    setVersion(item)
    let jsonValue = JSON.stringify(item)
    await AsyncStorage.setItem('version',jsonValue)
  }
  
  return (
    <View>
         <Menu >
            <MenuTrigger >
                <View style={{alignSelf:'center', marginTop:15}}>
                    <Text style={{color:'white'}} >
                        V.1.0.0 {version==='PROD' ? '' : version}
                    </Text>
                </View>
            </MenuTrigger>
            <MenuOptions customStyles={{padding:20}}>
                <FlatList
                    data={arrayVersion}
                    renderItem={({ item }) => (
                        <MenuOption value={item.version} text={item.version}  onSelect={() => changeVersion(item.version)}   />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </MenuOptions>
        </Menu>
    </View>
  )
}

const styles = StyleSheet.create({})