import React, { useState, useEffect, useRef }  from 'react'
import { SafeAreaView, FlatList, StyleSheet, View, Text, ActivityIndicator,ScrollView } from 'react-native';
import { Button, Overlay, Icon, ListItem, Divider } from '@rneui/themed';
import Toast, {DURATION} from 'react-native-easy-toast'
import { Buffer } from "buffer";
import { useFonts } from 'expo-font'; 
import axios from 'axios';
import ListProducts from './ListProducts';
import FooterTotal from '../../components/Account/FooterTotal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { documento } from '../../components/utils/Traductor';
import { formatAmount } from '../../components/utils/formatAmount';

export default function Home({navigation,sessionlogin}){
    let [loaded] = useFonts({
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
    });
    const [amountTotal, setAmuntTotal]=useState(0)
    const [array,setArray]=useState([])
    const [arrayOrder,setArrayOrder]=useState([])
    const [none,setNone]=useState(false)
    const [visible, setVisible] = useState(false);
    const [company, setCompany]= useState(null);
    const [status, setStatus]= useState(false);

    const toastRef = useRef();



    useEffect(() => {
        (async () => {
            setNone(false)
            let sessionlogin = await AsyncStorage.getItem('login')
            sessionlogin = sessionlogin != null ? JSON.parse(sessionlogin) : null;

            let usuario= await AsyncStorage.getItem('usuario')
            usuario = usuario != null ? JSON.parse(usuario) : null;
            
            let ambiente = await AsyncStorage.getItem('version')
            ambiente = ambiente != null ? JSON.parse(ambiente) : 'PROD';

            let apiUrl=null
            if(ambiente==='PROD'){ 
                apiUrl='https://api.fx360.cl/api/app/order-note/sync'
            }else{
                apiUrl='https://apiqa.fx360.cl/api/app/order-note/sync'
            }

            const config = {
                headers: { 
                  Authorization: `Bearer ${sessionlogin.token_sesion}`,
                  'connectionId':sessionlogin.id_conexión
                }
            }
            const bodyParameters = {
                domain:sessionlogin.dominio,
                user:usuario.nombre_usuario
            };
            axios.post(`${apiUrl}`,bodyParameters,config)
            .then(response => {
                for(let item of response.data.data.items){
                    item.qty=0
                    let imageObject=response.data.data.images.find(element => element.idItem==item.id);
                    if(imageObject){
                        item.image=Buffer.from(imageObject.image.data).toString('base64')
                    }else{
                        item.image='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'
                    }
                }
                setArray(response.data.data.items)
                setAmuntTotal(0)
                setCompany(response.data.data.companies[0].id)
                setNone(true)
            })
            .catch(error=>{
                setAmuntTotal(0)
                setNone(true)
                if(error.response.data.status==401)(
                    logout()
                )
            });
        })();
    },[]);

    if (!loaded) {
        return null;
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
    const sumItem=(item, index)=>{
        let newArr = [...array]; 
        newArr[index].qty = item.qty+1; 
        setAmuntTotal(amountTotal+item.price)
        setArray(newArr);
    }

    const resItem=(item, index)=>{
        let newArr = [...array]; 
        if(newArr[index].qty>0){
             newArr[index].qty = item.qty-1; 
             setAmuntTotal(amountTotal-item.price)
        }
        setArray(newArr);
    }

    const orderPedido=async ()=>{
        /*let newArr = [...array]; 
        setArrayOrder(newArr)*/
        setStatus(true)
        let flag=false
        for(let checkQty of array){
            if(checkQty.qty>0){
                flag=true
            }
        }
        if(flag){
            let sessionlogin = await AsyncStorage.getItem('login')
            sessionlogin = sessionlogin != null ? JSON.parse(sessionlogin) : null;

            let ambiente = await AsyncStorage.getItem('version')
            ambiente = ambiente != null ? JSON.parse(ambiente) : 'PROD';

            let apiUrl=null
            if(ambiente==='PROD'){ 
                apiUrl='https://api.fx360.cl/api/inventories/document/number'
            }else{
                apiUrl='https://apiqa.fx360.cl/api/inventories/document/number'
            }
    
            const config = {
                headers: { 
                  Authorization: `Bearer ${sessionlogin.token_sesion}`,
                  'connectionId':sessionlogin.id_conexión
                }
            }
    
            const bodyParameters = {
                domain: "vikingos.fx360.cl",
                app: "FX10",
                area: "ADM_Documentos",
                company: `${company}`, // Cambiaria esto
                number: 0,
                transmitter: `${company}`, // Y esto si acaso
                type: "NVNV"
            };
            axios.post(`${apiUrl}`,bodyParameters,config)
            .then(response => {
              tabDocument(response.data.data,sessionlogin,ambiente)
            })
            .catch(error=>{
                toastRef.current.show('Error al enviar pedido', 900)
                setStatus(false)
            });
        }else{
            setStatus(false)
            toastRef.current.show('Seleccione un producto', 900)
        }
    }

    const tabDocument=async(number,sessionlogin,ambiente)=>{

        const config = {
            headers: { 
              Authorization: `Bearer ${sessionlogin.token_sesion}`,
              'connectionId':sessionlogin.id_conexión
            }
        }

        const bodyParameters = {
            domain: sessionlogin.dominio,
            app: "FX10",
            company: "1",  // esto se cambia
            filter: "NVNV"
        }

        let apiUrl=null
        if(ambiente==='PROD'){ 
            apiUrl='https://api.fx360.cl/api/inventories/document/0'
        }else{
            apiUrl='https://apiqa.fx360.cl/api/inventories/document/0'
        }
        
        axios.post(`${apiUrl}`,bodyParameters,config)
        .then(response => {
          generateDocument(number,response.data.data.tab,sessionlogin,ambiente)
        })
        .catch(error=>{
            toastRef.current.show('Error al enviar pedido', 900)
            setStatus(false)
        });

    }

    const generateDocument = async (number,tab,sessionlogin, ambiente) => {
        let usuario= await AsyncStorage.getItem('usuario')
        usuario = usuario != null ? JSON.parse(usuario) : null;

        let doc = documento(sessionlogin.id_conexión,number,company, 1, 1, array,usuario,sessionlogin.dominio);
        
        let apiUrl=null
        if(ambiente==='PROD'){ 
            apiUrl='https://api.fx360.cl/api/inventories/document/store'
        }else{
            apiUrl='https://apiqa.fx360.cl/api/inventories/document/store'
        }
        const config = {
            headers: { 
              Authorization: `Bearer ${sessionlogin.token_sesion}`,
              'connectionId':sessionlogin.id_conexión
            }
        }
        axios.post(`${apiUrl}`,doc,config)
        .then(response => {
            setVisible(!visible);
            setStatus(false)
            resetArray()
            toastRef.current.show('Pedido enviado', 900)
        })
        .catch(error=>{
            toastRef.current.show('Error al enviar pedido', 900)
            setStatus(false)
            setVisible(!visible);
        });

    };

    const toggleOverlay = () => {
        setVisible(false);
    };

    const resetArray = () => {
        let newArr = [...array]; 
        for (let item of newArr){
            item.qty=0
        }
        setArray(newArr);
        setAmuntTotal(0)
    };

    const showOverlay = () => {
        /*let newArr = [...array]; 
        setArrayOrder(newArr)*/
        let flag=false
        for(let checkQty of array){
            if(checkQty.qty>0){
                flag=true
            }
        }
        if(flag){
            setVisible(true);
        }else{
            toastRef.current.show('Seleccione un producto', 900)
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <ListProducts
                document={item}
                onPressSuma={() => sumItem(item,index)}
                onPressResta={() => resItem(item,index)}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={array}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={array}
                ListEmptyComponent={()=>
                    <View style={{alignItems:"center", marginTop:20}}>
                      {(none) && <Text style={{alignItems:"center"}}>No posee opciones asignadas</Text>} 
                    </View>
                }
                ListHeaderComponent={
                    <View>
                      <None none={none} />
                    </View>
                }
            />
             <Toast ref={toastRef} position='top' />
            <FooterTotal showOverlay={showOverlay} status={status} amountTotal={amountTotal}/>

            <Overlay overlayStyle={styles.overlay} isVisible={visible} onBackdropPress={toggleOverlay}>
                <ScrollView>
                    <Text style={styles.title}>Confirme Pedido</Text>
                    <Divider style={{ backgroundColor: "#017BCA",width:"90%",alignSelf:"center",marginBottom:0,}}/>

                    {
                        array.map((l, i) => (
                           (l.qty>0 && <ListItem key={i} bottomDivider>
                            <ListItem.Content >
                                <ListItem.Title style={{fontSize:14,fontFamily:'Montserrat-Regular'}}>{l.qty} {l.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content right>
                                <ListItem.Title  right style={{fontFamily:'Montserrat-Regular'}}>${formatAmount(l.qty*l.price)}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>) 
                        ))
                    }
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1}}>
                            <Button
                                type="clear"
                                titleStyle={{color:"#d9534f"}}
                                //buttonStyle={{backgroundColor:"#d9534f"}}
                                title="Cancelar"
                                onPress={toggleOverlay}
                            />
                        </View>
                        <View style={{flex:1}}>
                            {
                                status ? (<ActivityIndicator size="large" color="#00a680"/>) :
                                (
                                    <Button
                                        type="clear"
                                        titleStyle={{color:"#00a680"}}
                                        // buttonStyle={{backgroundColor:"#d9534f"}}
                                        title="Confirmar"
                                        onPress={orderPedido}
                                    />
                                )
                            } 
                        </View>
                    </View>
                </ScrollView>
            </Overlay>

        </SafeAreaView>
    );
}

const None=({none})=>{
    return ( 
        <View>  
            {(!none) && <View style={styles.loaderRestaurants}>
                <ActivityIndicator size="large" color="black"/>
                <Text>Cargando Productos</Text>
            </View>} 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    loaderRestaurants:{
        marginTop:10,
        marginBottom:10,
        alignItems:"center"
    },
    overlay:{
        width:"90%",
        backgroundColor:"#fff",
        borderRadius:15,
    },
    title: {
        marginVertical:20,
        fontSize:15,
        fontFamily:'Montserrat-Bold',
        color:'#00a680',
        alignSelf:'center'
    },
});