import React from 'react';
import { StyleSheet,  View, ImageBackground, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from '../../components/Logo';
import ButtonAccess from '../../components/ButtonAccess';
export default function LoginScreen({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const login = () => {
    navigation.navigate('Login')
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
                    placeholder="Usuario"
                  />
              </View>
              <ButtonAccess text={'RECUPERAR'} onPress={login}/>
            </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
     
    );
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
 
});
  