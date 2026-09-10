import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Models/NavigationTypes';
import type { User } from '../../Models/User';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const mockUser: User = {
  id: '1',
  name: 'David Funez',
  email: 'david@ceutec.hn',
};

export default function ProfileScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={
          mockUser.avatarUrl
            ? { uri: mockUser.avatarUrl }
            : require('../../assets/logo-sinfondo.png')
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{mockUser.name}</Text>
      <Text style={styles.email}>{mockUser.email}</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.primaryButtonText}>Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Welcome')}
      >
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