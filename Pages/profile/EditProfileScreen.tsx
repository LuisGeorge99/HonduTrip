import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Models/NavigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const [name, setName] = useState<string>('David Funez');
  const [email, setEmail] = useState<string>('david@ceutec.hn');

  const handleSave = (): void => {
    // TODO: conectar con Services/authService cuando exista
    console.log('Guardado:', { name, email });
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', color: '#1E5C8A', marginBottom: 32, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#1E5C8A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#1E5C8A', textAlign: 'center' },
});