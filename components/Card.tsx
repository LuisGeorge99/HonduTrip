// components/Card.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  price?: string;
  rating?: number;
  onPress?: () => void;
}

export default function Card({ title, subtitle, image, price, rating, onPress }: CardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: image || 'https://placehold.co/300x180/0FA968/FFFFFF?text=HonduTrip' }}
        style={styles.image}
      />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
        <View style={styles.footer}>
          {price ? <Text style={styles.price}>{price}</Text> : <View />}
          {rating ? (
            <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: { width: '100%', height: 140, backgroundColor: Colors.lightGray },
  body: { padding: 12 },
  title: { fontSize: 15, fontWeight: '700', color: Colors.black },
  subtitle: { fontSize: 12, color: Colors.gray, marginTop: 2 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: { color: Colors.primaryGreen, fontWeight: '700', fontSize: 14 },
  rating: { color: Colors.primaryBlue, fontWeight: '600', fontSize: 13 },
});
