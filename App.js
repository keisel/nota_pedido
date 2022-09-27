import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from 'react-native-popup-menu';
import { StyleSheet } from 'react-native';
import LoginScreen from './app/screens/welcome/Login'
import AccountScreen from './app/screens/home/Account';
import ResetPassword from './app/screens/welcome/ResetPassword'
import AddConexionScreen from './app/screens/welcome/AddConexion';
import MainScreen from './app/screens/welcome/Main';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <MenuProvider>
          <Stack.Navigator 
              initialRouteName="Main"
              screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#0E035A' },
                headerTitleAlign: 'center'

              }}
            >
            <Stack.Screen name="Main" component={MainScreen} options={{title: 'Main app', headerShown:false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login app', headerShown:false}}/>
            <Stack.Screen name="Reset" component={ResetPassword} options={{title: 'Recuperar Contraseña'}}/>
            <Stack.Screen name="Account" component={AccountScreen} options={{title: 'Account',  headerShown:false}}/>
            <Stack.Screen name="Conexion" component={AddConexionScreen} options={{title: 'Agregar Conexión'}}/>

          </Stack.Navigator>
      </MenuProvider>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
