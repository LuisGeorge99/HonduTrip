// app/packages/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { TravelPackage, getPackageById } from '../../services/packageService';

export default function PackageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [pkg, setPkg] = useState<TravelPackage | null>(null);

  useEffect(() => {
    if (id) getPackageById(id).then((p) => setPkg(p ?? null));
  }, [id]);

  if (!pkg) return null;

  return (
    <View style={styles.container}>
      <Header title={pkg.name} showBack />
      <ScrollView>
        <Image source={{ uri: pkg.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{pkg.name}</Text>
          <Text style={styles.price}>${pkg.price} por persona</Text>
          <Text style={styles.description}>{pkg.description}</Text>

          <Text style={styles.sectionTitle}>Incluye</Text>
          {pkg.includes.map((item) => (
            <Text key={item} style={styles.includeItem}>✅ {item}</Text>
          ))}

          <Button
            label="Reservar este paquete"
            onPress={() => router.push({ pathname: '/bookings/new', params: { packageId: pkg.id } })}
            style={{ marginTop: 24 }}
          />
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
  price: { fontSize: 18, fontWeight: '700', color: Colors.primaryGreen, marginTop: 4 },
  description: { color: Colors.gray, marginTop: 10, lineHeight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.black, marginTop: 20, marginBottom: 8 },
  includeItem: { color: Colors.black, marginBottom: 6, fontSize: 14 },
});
