import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Models/NavigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo-sinfondo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.slogan}>Viaja, Reserva y Disfruta</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: { width: 220, height: 220, marginBottom: 12 },
  slogan: { fontSize: 16, color: '#1E5C8A', marginBottom: 40 },
  primaryButton: {
    backgroundColor: '#1E5C8A',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E5C8A',
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#1E5C8A', fontWeight: '600', fontSize: 16 },
});