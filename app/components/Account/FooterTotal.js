import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatAmount } from '../../components/utils/formatAmount';

export default function FooterTotal({amountTotal,status,showOverlay}) {
  return (
    <View style={{flexDirection:"row",backgroundColor:'white'}}>
        <View style={{flex:1}}>
            <Text style={styles.textAmountTotal}>
                Total a pagar
            </Text>
            <Text style={styles.amountTotal}>
                ${formatAmount(amountTotal)}
            </Text>
        </View>
        <View style={{flex:1}}>
            <TouchableOpacity  disabled={status} style={styles.button} onPress={showOverlay}>
                    <Text style={{ color:'white'}}>Hacer pedido</Text>             
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#0E035A",
        paddingTop:12,
        paddingBottom:12,
        borderRadius:30,
        marginLeft:40,
        marginRight:40,
        marginTop:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    amountTotal: {
        marginLeft:15,
        marginTop:0,
        marginBottom:10,
        color:"#0E035A", 
        fontFamily:'Montserrat-Bold', 
        fontSize:20,
        alignSelf:'center'
    },
    textAmountTotal:{
        marginLeft:15,
        marginTop:10,
        marginBottom:0,
        color:"black", 
        fontFamily:'Montserrat-Regular', 
        fontSize:15,
        alignSelf:'center'
    },
})