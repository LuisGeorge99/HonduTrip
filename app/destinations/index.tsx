// app/destinations/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Destination, getDestinations } from '../../services/destinationService';

const CATEGORIES = ['Todos', 'Playa', 'Aventura', 'Cultural', 'Naturaleza'];

export default function DestinationsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [items, setItems] = useState<Destination[]>([]);

  useEffect(() => {
    getDestinations(query, category).then(setItems);
  }, [query, category]);

  return (
    <View style={styles.container}>
      <Header title="Destinos" />
      <View style={styles.content}>
        <TextInput
          style={styles.search}
          placeholder="Buscar destino..."
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.chip, category === c && styles.chipActive]}
              onPress={() => setCategory(c)}
            >
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={items}
          keyExtractor={(d) => d.id}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subtitle={item.description}
              image={item.image}
              rating={item.rating}
              onPress={() => router.push(`/destinations/${item.id}`)}
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
  search: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, backgroundColor: Colors.lightGray, marginBottom: 12,
  },
  filters: { marginBottom: 14, maxHeight: 40 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: Colors.primaryGreen, marginRight: 8,
  },
  chipActive: { backgroundColor: Colors.primaryGreen },
  chipText: { color: Colors.primaryGreen, fontWeight: '600', fontSize: 13 },
  chipTextActive: { color: Colors.white },
});
