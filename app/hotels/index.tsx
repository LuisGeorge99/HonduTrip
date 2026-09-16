// app/hotels/index.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Hotel, getHotels } from '../../services/hotelService';

export default function HotelsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Hotel[]>([]);

  useEffect(() => {
    getHotels().then(setItems);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Hoteles" />
      <View style={styles.content}>
        <FlatList
          data={items}
          keyExtractor={(h) => h.id}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subtitle={item.availability ? 'Disponible' : 'Sin disponibilidad'}
              image={item.image}
              price={`$${item.price}/noche`}
              rating={item.rating}
              onPress={() => router.push(`/hotels/${item.id}`)}
            />
          )}
        />
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flex: 1, padding: 16 },
});
