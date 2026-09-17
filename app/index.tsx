// app/index.tsx — Welcome
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/colors';
import Button from '../components/Button';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/300x300/0FA968/FFFFFF?text=HonduTrip' }}
        style={styles.logo}
      />
      <Text style={styles.title}>HonduTrip</Text>
      <Text style={styles.subtitle}>Descubre lo mejor de Honduras</Text>

      <View style={styles.actions}>
        <Button label="Iniciar sesión" onPress={() => router.push('/login')} />
        <Button
          label="Crear cuenta"
          variant="outline"
          onPress={() => router.push('/register')}
          style={{ marginTop: 12 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: { width: 140, height: 140, borderRadius: 70, marginBottom: 24 },
  title: { fontSize: 30, fontWeight: '800', color: Colors.black },
  subtitle: { fontSize: 15, color: Colors.gray, marginTop: 6, marginBottom: 40 },
  actions: { width: '100%' },
});
