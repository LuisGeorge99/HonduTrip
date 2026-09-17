// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/colors';
import Button from '../components/Button';
import Header from '../components/Header';
import { register } from '../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      router.replace('/destinations');
    } catch (e: any) {
      Alert.alert('No se pudo registrar', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Crear cuenta" showBack />
      <View style={styles.content}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tu nombre" />
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="tucorreo@ejemplo.com" />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
        <Button label="Crear cuenta" onPress={handleRegister} loading={loading} style={{ marginTop: 24 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 20 },
  label: { fontSize: 13, color: Colors.gray, marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
    backgroundColor: Colors.lightGray, color: Colors.black,
  },
});
