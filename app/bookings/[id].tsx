// app/bookings/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { Booking, getBookingById, cancelBooking } from '../../services/bookingService';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (id) getBookingById(id).then((b) => setBooking(b ?? null));
  }, [id]);

  const handleCancel = async () => {
    if (!booking) return;
    Alert.alert('Cancelar reserva', '¿Estás seguro de cancelar esta reserva?', [
      { text: 'No' },
      {
        text: 'Sí, cancelar',
        style: 'destructive',
        onPress: async () => {
          await cancelBooking(booking.id);
          setBooking({ ...booking, status: 'Cancelada' });
        },
      },
    ]);
  };

  if (!booking) return null;

  return (
    <View style={styles.container}>
      <Header title="Detalle de reserva" showBack />
      <View style={styles.content}>
        <Text style={styles.name}>{booking.packageName}</Text>
        <Text style={styles.status}>Estado: {booking.status}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha</Text>
          <Text style={styles.value}>{booking.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Personas</Text>
          <Text style={styles.value}>{booking.people}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total pagado</Text>
          <Text style={styles.value}>${booking.total}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>No. de reserva</Text>
          <Text style={styles.value}>{booking.id}</Text>
        </View>

        {booking.status !== 'Cancelada' && booking.status !== 'Completada' && (
          <Button label="Cancelar reserva" variant="outline" onPress={handleCancel} style={{ marginTop: 24 }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 20 },
  name: { fontSize: 20, fontWeight: '800', color: Colors.black },
  status: { color: Colors.primaryGreen, fontWeight: '700', marginTop: 4, marginBottom: 20 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: Colors.border, paddingVertical: 12,
  },
  label: { color: Colors.gray },
  value: { color: Colors.black, fontWeight: '600' },
});
