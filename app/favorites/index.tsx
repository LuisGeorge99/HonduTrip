// app/favorites/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { FavoriteItem, getFavorites } from '../../services/favoriteService';

const TYPE_ICON: Record<string, string> = {
  destination: '🏝️',
  package: '🎒',
  hotel: '🏨',
};

export default function FavoritesScreen() {
  const [items, setItems] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    getFavorites().then(setItems);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Mis favoritos" />
      <View style={styles.content}>
        <FlatList
          data={items}
          keyExtractor={(f) => f.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{TYPE_ICON[item.type]} {item.name}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Aún no tienes favoritos ❤️</Text>}
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
    borderRadius: 14, padding: 10, marginBottom: 12,
  },
  image: { width: 56, height: 56, borderRadius: 10, marginRight: 12 },
  name: { fontWeight: '700', color: Colors.black, fontSize: 14 },
  empty: { textAlign: 'center', color: Colors.gray, marginTop: 40 },
});
