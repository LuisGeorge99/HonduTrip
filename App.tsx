/* import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './Models/NavigationTypes';

import WelcomeScreen from './Pages/auth/WelcomeScreen';
import LoginScreen from './Pages/auth/LoginScreen';
import RegisterScreen from './Pages/auth/RegisterScreen';
import ProfileScreen from './Pages/profile/ProfileScreen';
import EditProfileScreen from './Pages/profile/EditProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
} */

  import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import DestinoProviders from './Providers/DestinosProviders'; 
import ExplorarDestinos from './Pages/Destinos/ExplorarDestinos'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DestinoProviders>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          <Stack.Screen name="ExplorarDestinos" component={ExplorarDestinos} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </DestinoProviders>
  );
}