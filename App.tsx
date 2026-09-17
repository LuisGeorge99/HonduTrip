import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './Models/NavigationTypes';

import WelcomeScreen from './Pages/auth/WelcomeScreen';
import LoginScreen from './Pages/auth/LoginScreen';
import RegisterScreen from './Pages/auth/RegisterScreen';
import ProfileScreen from './Pages/profile/ProfileScreen';
import EditProfileScreen from './Pages/profile/EditProfileScreen';

import AuthProvider from './Providers/AuthProviders';
import DestinoProviders from './Providers/DestinosProviders';
import PaquetesProviders from './Providers/PaquetesProviders';
import TransporteProviders from './Providers/TransporteProviders';
import ExplorarDestinos from './Pages/Destinos/ExplorarDestinos';
import ExplorarPaquetes from './Pages/Paquetes/ExplorarPaquetes';
import ContratarTransporte from './Pages/Transporte/ContratarTransporte';
import ReservarPaquete from './Pages/Reservas/ReservarPaquete';
import ReservarHotel from './Pages/Reservas/ReservarHotel';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <DestinoProviders>
        <PaquetesProviders>
          <TransporteProviders>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />

              <Stack.Screen name="ExplorarDestinos" component={ExplorarDestinos} />
              <Stack.Screen name="ExplorarPaquetes" component={ExplorarPaquetes} />
              <Stack.Screen name="ContratarTransporte" component={ContratarTransporte} />
              <Stack.Screen name="ReservarPaquete" component={ReservarPaquete} />
              <Stack.Screen name="ReservarHotel" component={ReservarHotel} />
            </Stack.Navigator>
          </NavigationContainer>
        </TransporteProviders>
      </PaquetesProviders>
    </DestinoProviders>
  );
}