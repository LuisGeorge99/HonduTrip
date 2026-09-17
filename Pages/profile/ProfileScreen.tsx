import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Models/NavigationTypes';
import { useAuth } from '../../Providers/AuthProviders';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigation.navigate('Welcome');
  };

  if (!user) {
    // No debería pasar si se navega bien, pero por seguridad regresamos a Login.
    navigation.navigate('Login');
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          user.avatarUrl
            ? { uri: user.avatarUrl }
            : require('../../assets/logo-sinfondo.png')
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.primaryButtonText}>Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
        <Text style={styles.secondaryButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: '700', color: '#1E5C8A' },
  email: { fontSize: 14, color: '#666', marginBottom: 32 },
  primaryButton: {
    backgroundColor: '#1E5C8A',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  secondaryButton: { paddingVertical: 14, paddingHorizontal: 40 },
  secondaryButtonText: { color: '#c0392b', fontWeight: '600' },
});
