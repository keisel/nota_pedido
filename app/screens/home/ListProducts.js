import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import { formatAmount } from '../../components/utils/formatAmount';
import { useFonts } from 'expo-font'; 
import { Icon } from "@rneui/themed";

export default function ListProducts(props) {
    let {document, onPressSuma,onPressResta}=props;
    let {name, id,code, price,qty,image}=document;
    let [loaded] = useFonts({
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.item}>
            <View style={{flex:1}}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: `data:image/png;base64,${image}`,
                      }}
                />
            </View>
            <View style={{flex:2, padding:10,}}>
                <View style={{flex:1}}>
                    <Text style={styles.title}>{name}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.amount}>
                        <Text style={{ color:"#0E035A"}}>$</Text>
                        {formatAmount(price)}
                    </Text>
                </View>
                <View style={{flex:1, flexDirection:'row',alignSelf:'flex-end'}}> 
                    <View style={{ alignItems:'flex-end', marginTop:-30, flexDirection:'row'}}>
                        <TouchableOpacity  onPress={onPressResta} >
                            <Icon 
                                reverse
                                type="material-community"
                                name="window-minimize"
                                color="#d9534f"
                                containerStyle={styles.btnContainerCancel}
                                size={20}
                            
                            />
                        </TouchableOpacity>
                        <Text style={{ color:"#0E035A", marginBottom:20}}>{qty} </Text>
                        <TouchableOpacity   onPress={onPressSuma}>
                            <Icon 
                                reverse
                                type="material-community"
                                name="plus"
                                color="#00a680"
                                containerStyle={styles.btnContainerApprove}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      paddingLeft:0,
      paddingRight:0,
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius:20,
      flexDirection:"row",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
      flex:1,
    },
    title: {
      marginLeft:5,
      marginTop:20,
      fontSize:13,
      fontFamily:'Montserrat-Bold',
      color:'#0E035A'
    },
    amount: {
        marginLeft:5,
        marginTop:20,
        color:"black", 
        fontFamily:'Montserrat-Regular', 
        fontSize:15
      },
    logo:{
        width:'100%',
        height:'100%',
        padding:0,
        margin:0,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
    },
    btnContainerCancel:{
      shadowColor:"black",
      shadowOffset:{width:2, height:2},
      shadowOpacity:0.5,
    },
    btnContainerApprove:{
      shadowColor:"black",
      shadowOffset:{width:2, height:2},
      shadowOpacity:0.5,
    }
})