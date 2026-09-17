// components/BottomNav.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Colors from '../constants/colors';

const TABS = [
  { key: 'destinations', label: 'Destinos', icon: '🏝️', path: '/destinations' },
  { key: 'packages', label: 'Paquetes', icon: '🎒', path: '/packages' },
  { key: 'bookings', label: 'Reservas', icon: '📅', path: '/bookings' },
  { key: 'favorites', label: 'Favoritos', icon: '❤️', path: '/favorites' },
  { key: 'profile', label: 'Perfil', icon: '👤', path: '/profile' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = pathname?.startsWith(tab.path);
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => router.push(tab.path as any)}
          >
            <Text style={[styles.icon, active && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: 8,
    paddingBottom: 14,
  },
  tab: { flex: 1, alignItems: 'center' },
  icon: { fontSize: 20, opacity: 0.5 },
  iconActive: { opacity: 1 },
  label: { fontSize: 11, color: Colors.gray, marginTop: 2 },
  labelActive: { color: Colors.primaryGreen, fontWeight: '700' },
});
