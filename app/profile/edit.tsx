// app/profile/edit.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/colors';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { getCurrentUser, updateProfile } from '../../services/authService';

export default function EditProfileScreen() {
  const router = useRouter();
  const user = getCurrentUser();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [avatar, setAvatar] = useState(user?.avatar);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({ name, email, avatar });
      router.back();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Editar perfil" showBack />
      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: avatar || 'https://placehold.co/160x160/1565C0/FFFFFF?text=HT' }}
            style={styles.avatar}
          />
          <Text style={styles.changePhoto}>Cambiar foto</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Correo</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

        <Button label="Guardar cambios" onPress={handleSave} loading={loading} style={{ marginTop: 24 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 20, alignItems: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  changePhoto: { color: Colors.primaryBlue, textAlign: 'center', marginTop: 8, fontWeight: '600' },
  label: { alignSelf: 'flex-start', fontSize: 13, color: Colors.gray, marginBottom: 6, marginTop: 16 },
  input: {
    width: '100%', borderWidth: 1, borderColor: Colors.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
    backgroundColor: Colors.lightGray, color: Colors.black,
  },
});
