// app/notifications/index.tsx — confirmaciones, recordatorios y promociones
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { getBookings, Booking } from '../../services/bookingService';

interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  body: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    getBookings().then((bookings: Booking[]) => {
      const generated: NotificationItem[] = bookings.map((b) => {
        if (b.status === 'Confirmada') {
          return { id: `conf-${b.id}`, icon: '🔔', title: '¡Reserva confirmada!', body: `Tu viaje "${b.packageName}" está reservado para el ${b.date}.` };
        }
        if (b.status === 'Pendiente') {
          return { id: `rec-${b.id}`, icon: '🔔', title: 'Tu viaje está próximo', body: `Recuerda completar el pago de "${b.packageName}".` };
        }
        return { id: `hist-${b.id}`, icon: '📜', title: 'Viaje completado', body: `Esperamos que hayas disfrutado "${b.packageName}".` };
      });
      setItems(generated);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Notificaciones" rightIcon="🎁" onRightPress={() => router.push('/notifications/promotions')} />
      <View style={styles.content}>
        <FlatList
          data={items}
          keyExtractor={(n) => n.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No tienes notificaciones.</Text>}
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
    flexDirection: 'row', backgroundColor: Colors.lightGray, borderRadius: 14,
    padding: 14, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: Colors.primaryBlue,
  },
  icon: { fontSize: 20, marginRight: 12 },
  title: { fontWeight: '700', color: Colors.black, fontSize: 14 },
  body: { color: Colors.gray, fontSize: 13, marginTop: 2 },
  empty: { textAlign: 'center', color: Colors.gray, marginTop: 40 },
});
