// app/profile/index.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Button from '../../components/Button';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { getCurrentUser, logout } from '../../services/authService';

export default function ProfileScreen() {
  const router = useRouter();
  const user = getCurrentUser() ?? { name: 'Viajero HonduTrip', email: 'viajero@hondutrip.com' };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Header title="Mi perfil" rightIcon="✏️" onRightPress={() => router.push('/profile/edit')} />
      <View style={styles.content}>
        <Image
          source={{ uri: (user as any).avatar || 'https://placehold.co/160x160/1565C0/FFFFFF?text=HT' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.menu}>
          <MenuItem icon="📅" label="Mis reservas" onPress={() => router.push('/bookings')} />
          <MenuItem icon="❤️" label="Favoritos" onPress={() => router.push('/favorites')} />
          <MenuItem icon="🔔" label="Notificaciones" onPress={() => router.push('/notifications/promotions')} />
        </View>

        <Button label="Cerrar sesión" variant="outline" onPress={handleLogout} style={{ marginTop: 20 }} />
      </View>
      <BottomNav />
    </View>
  );
}

function MenuItem({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <Text style={styles.menuItem} onPress={onPress}>
      {icon}  {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flex: 1, alignItems: 'center', padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginTop: 10 },
  name: { fontSize: 20, fontWeight: '700', color: Colors.black, marginTop: 12 },
  email: { fontSize: 13, color: Colors.gray, marginBottom: 20 },
  menu: { width: '100%' },
  menuItem: {
    fontSize: 15, color: Colors.black, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
});
