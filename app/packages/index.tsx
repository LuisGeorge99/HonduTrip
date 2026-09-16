// app/packages/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { TravelPackage, getPackages } from '../../services/packageService';

const TYPES = ['Todos', 'Playa', 'Aventura', 'Cultural', 'Romántico', 'Familiar'];

export default function PackagesScreen() {
  const router = useRouter();
  const [type, setType] = useState('Todos');
  const [items, setItems] = useState<TravelPackage[]>([]);

  useEffect(() => {
    getPackages(type).then(setItems);
  }, [type]);

  return (
    <View style={styles.container}>
      <Header title="Paquetes" />
      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {TYPES.map((t) => (
            <TouchableOpacity key={t} style={[styles.chip, type === t && styles.chipActive]} onPress={() => setType(t)}>
              <Text style={[styles.chipText, type === t && styles.chipTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={items}
          keyExtractor={(p) => p.id}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subtitle={item.description}
              image={item.image}
              price={`$${item.price}`}
              rating={item.rating}
              onPress={() => router.push(`/packages/${item.id}`)}
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
  filters: { marginBottom: 14, maxHeight: 40 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: Colors.primaryBlue, marginRight: 8 },
  chipActive: { backgroundColor: Colors.primaryBlue },
  chipText: { color: Colors.primaryBlue, fontWeight: '600', fontSize: 13 },
  chipTextActive: { color: Colors.white },
});
