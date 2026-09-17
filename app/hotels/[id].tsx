// app/hotels/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import { Hotel, getHotelById } from '../../services/hotelService';

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    if (id) getHotelById(id).then((h) => setHotel(h ?? null));
  }, [id]);

  if (!hotel) return null;

  return (
    <View style={styles.container}>
      <Header title={hotel.name} showBack />
      <ScrollView>
        <Image source={{ uri: hotel.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{hotel.name}</Text>
          <Text style={styles.price}>${hotel.price} / noche</Text>
          <Text style={[styles.badge, { color: hotel.availability ? Colors.primaryGreen : Colors.error }]}>
            {hotel.availability ? 'Disponible' : 'Sin disponibilidad'}
          </Text>

          <Text style={styles.sectionTitle}>Servicios</Text>
          {hotel.services.map((s) => (
            <Text key={s} style={styles.service}>• {s}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  image: { width: '100%', height: 220 },
  content: { padding: 18 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.black },
  price: { fontSize: 18, fontWeight: '700', color: Colors.primaryBlue, marginTop: 4 },
  badge: { fontWeight: '700', marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.black, marginTop: 20, marginBottom: 8 },
  service: { color: Colors.gray, marginBottom: 6, fontSize: 14 },
});
