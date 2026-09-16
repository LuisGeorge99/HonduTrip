// app/bookings/index.tsx — Mis reservas + historial
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Booking, getBookings } from '../../services/bookingService';

const STATUS_ICON: Record<string, string> = {
  Pendiente: '⏳',
  Confirmada: '✅',
  Cancelada: '❌',
  Completada: '✅',
};

export default function BookingsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Booking[]>([]);

  useEffect(() => {
    getBookings().then(setItems);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Mis reservas" />
      <View style={styles.content}>
        <FlatList
          data={items}
          keyExtractor={(b) => b.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => router.push(`/bookings/${item.id}`)}>
              <Text style={styles.icon}>{STATUS_ICON[item.status]}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.packageName}</Text>
                <Text style={styles.date}>{item.date} • {item.people} persona(s)</Text>
              </View>
              <View>
                <Text style={styles.total}>${item.total}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Aún no tienes reservas.</Text>}
        />
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flex: 1, padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.lightGray,
    borderRadius: 14, padding: 14, marginBottom: 12,
  },
  icon: { fontSize: 22, marginRight: 12 },
  name: { fontWeight: '700', color: Colors.black, fontSize: 14 },
  date: { color: Colors.gray, fontSize: 12, marginTop: 2 },
  total: { fontWeight: '800', color: Colors.primaryGreen, textAlign: 'right' },
  status: { fontSize: 11, color: Colors.primaryBlue, textAlign: 'right', marginTop: 2 },
  empty: { textAlign: 'center', color: Colors.gray, marginTop: 40 },
});
