// app/bookings/new.tsx — flujo: paquete -> fecha -> personas -> confirmar
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { TravelPackage, getPackageById } from '../../services/packageService';
import { createBooking } from '../../services/bookingService';

export default function NewBookingScreen() {
  const { packageId } = useLocalSearchParams<{ packageId: string }>();
  const router = useRouter();
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packageId) getPackageById(packageId).then((p) => setPkg(p ?? null));
  }, [packageId]);

  const total = pkg ? pkg.price * (parseInt(people) || 1) : 0;

  const handleContinue = async () => {
    if (!pkg || !date) return;
    setLoading(true);
    const booking = await createBooking({
      packageId: pkg.id,
      packageName: pkg.name,
      date,
      people: parseInt(people) || 1,
      total,
    });
    setLoading(false);
    router.push({
      pathname: '/bookings/confirm-payment',
      params: { bookingId: booking.id, packageName: pkg.name, total: String(total) },
    });
  };

  if (!pkg) return null;

  return (
    <View style={styles.container}>
      <Header title="Nueva reserva" showBack />
      <View style={styles.content}>
        <Text style={styles.pkgName}>{pkg.name}</Text>
        <Text style={styles.pkgPrice}>${pkg.price} por persona</Text>

        <Text style={styles.label}>Fecha del viaje (AAAA-MM-DD)</Text>
        <TextInput style={styles.input} placeholder="2026-12-20" value={date} onChangeText={setDate} />

        <Text style={styles.label}>Número de personas</Text>
        <TextInput style={styles.input} keyboardType="number-pad" value={people} onChangeText={setPeople} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total estimado</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>

        <Button label="Continuar al pago" onPress={handleContinue} loading={loading} style={{ marginTop: 20 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 20 },
  pkgName: { fontSize: 20, fontWeight: '800', color: Colors.black },
  pkgPrice: { color: Colors.primaryGreen, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 13, color: Colors.gray, marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, backgroundColor: Colors.lightGray, color: Colors.black,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  totalLabel: { fontSize: 15, color: Colors.black, fontWeight: '600' },
  totalValue: { fontSize: 18, color: Colors.primaryGreen, fontWeight: '800' },
});
