import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Icon } from "@rneui/themed";


export default function MenuConexion({array,setDominio, dominio}) {
  return (
    <View style={{flex:1, alignSelf:'center', marginTop:35}}>
        <Menu >
            <MenuTrigger >
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:15, color:'white'}} >
                        { array.length>0 ? dominio : 'Seleccione Conexión' }
                    </Text>
                    <Icon 
                        type="material-community"
                        name="chevron-down"
                        color="white"
                        size={30}
                        containerStyle={{marginTop:-3, marginRight:0}}
                    />
                </View>
            </MenuTrigger>
            <MenuOptions customStyles={{padding:20}}>
                <FlatList
                    data={array}
                    renderItem={({ item }) => (
                        <MenuOption value={item.URL} text={item.URL}  onSelect={() => setDominio(item.URL)}   />
                    )}
                    keyExtractor={(item) => item.id}
                    style={{ minHeight: 50 }}
                />
                {/*<ScrollView style={{ maxHeight: 150 }}>
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2023)} text='2023' />
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2022)} text='2022' />
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2021)} text='2021' />
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2020)} text='2020' />
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2019)} text='2019' />
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2018)} text='2018' />
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2017)} text='2017' />
                    <MenuOption style={styles.selectStyle} onSelect={() => changeYear(2016)} text='2016' />
                </ScrollView>*/}
            </MenuOptions>
        </Menu>
    </View>
  )
}

const styles = StyleSheet.create({})