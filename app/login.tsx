// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/colors';
import Button from '../components/Button';
import Header from '../components/Header';
import { login } from '../services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/destinations');
    } catch (e: any) {
      Alert.alert('No se pudo iniciar sesión', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Iniciar sesión" showBack />
      <View style={styles.content}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="tucorreo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button label="Entrar" onPress={handleLogin} loading={loading} style={{ marginTop: 24 }} />
        <Text style={styles.link} onPress={() => router.push('/register')}>
          ¿No tienes cuenta? Regístrate
        </Text>
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
  link: { color: Colors.primaryBlue, textAlign: 'center', marginTop: 20, fontWeight: '600' },
});
