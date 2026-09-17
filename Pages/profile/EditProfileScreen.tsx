import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Models/NavigationTypes';
import { useAuth } from '../../Providers/AuthProviders';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState<string>(user?.name ?? '');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSave = async (): Promise<void> => {
    if (!name.trim()) {
      setError('El nombre no puede estar vacío.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await updateProfile({ name: name.trim() });
      navigation.navigate('Profile');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo guardar el cambio.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
        editable={!isSubmitting}
      />
      {/* El correo no es editable: identifica la cuenta en el backend. */}
      <TextInput
        style={[styles.input, styles.inputDisabled]}
        value={user?.email ?? ''}
        editable={false}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
        onPress={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>Guardar cambios</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} disabled={isSubmitting}>
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
  inputDisabled: { backgroundColor: '#f2f2f2', color: '#888' },
  error: { color: '#c0392b', marginBottom: 12, textAlign: 'center' },
  primaryButton: {
    backgroundColor: '#1E5C8A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#1E5C8A', textAlign: 'center' },
});
