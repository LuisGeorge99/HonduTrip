// app/destinations/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Rating from '../../components/Rating';
import { Destination, getDestinationById, distanceKm } from '../../services/destinationService';
import { getCurrentLocation } from '../../location/LocationService';
import { getReviews, addReview, averageRating, Review } from '../../services/reviewService';
import { isFavorite, toggleFavorite } from '../../services/favoriteService';

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState('');
  const [myRating, setMyRating] = useState(5);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (!id) return;
    getDestinationById(id).then((d) => {
      setDestination(d ?? null);
      setFav(isFavorite(id));
    });
    getReviews(id).then(setReviews);
  }, [id]);

  const handleLocate = async () => {
    if (!destination) return;
    const location = await getCurrentLocation();
    if (location) {
      setDistance(distanceKm(location.latitude, location.longitude, destination.latitude, destination.longitude));
    }
  };

  const handleFavorite = async () => {
    if (!destination) return;
    const added = await toggleFavorite({ type: 'destination', refId: destination.id, name: destination.name, image: destination.image });
    setFav(added);
  };

  const handleComment = async () => {
    if (!destination || !comment.trim()) return;
    const review = await addReview({ targetId: destination.id, author: 'Tú', rating: myRating, comment });
    setReviews((prev) => [review, ...prev]);
    setComment('');
  };

  if (!destination) return null;

  return (
    <View style={styles.container}>
      <Header title={destination.name} showBack rightIcon={fav ? '❤️' : '🤍'} onRightPress={handleFavorite} />
      <ScrollView>
        <Image source={{ uri: destination.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title}>{destination.name}</Text>
            <Rating value={Math.round(averageRating(destination.id) || destination.rating)} readOnly size={16} />
          </View>
          <Text style={styles.description}>{destination.description}</Text>

          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>📍 Ubicación del destino</Text>
            <Text style={styles.locationValue}>
              Lat: {destination.latitude.toFixed(4)}  Lon: {destination.longitude.toFixed(4)}
            </Text>
            <Button label="Calcular distancia desde mi ubicación" variant="outline" onPress={handleLocate} style={{ marginTop: 10 }} />
            {distance !== null && (
              <Text style={styles.distanceText}>📍 Tu ubicación → 🏝️ {destination.name}: {distance.toFixed(1)} km</Text>
            )}
          </View>

          <Button label="Ver paquetes de este destino" onPress={() => router.push('/packages')} style={{ marginTop: 16 }} />

          <Text style={styles.sectionTitle}>Reseñas</Text>
          <View style={styles.reviewForm}>
            <Rating value={myRating} onChange={setMyRating} />
            <TextInput
              style={styles.input}
              placeholder="Escribir comentario..."
              value={comment}
              onChangeText={setComment}
              onSubmitEditing={handleComment}
            />
          </View>
          {reviews.map((r) => (
            <View key={r.id} style={styles.reviewItem}>
              <Rating value={r.rating} readOnly size={14} />
              <Text style={styles.reviewAuthor}>{r.author}</Text>
              <Text style={styles.reviewComment}>"{r.comment}"</Text>
            </View>
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
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: Colors.black },
  description: { color: Colors.gray, fontSize: 14, marginTop: 8, lineHeight: 20 },
  locationCard: { backgroundColor: Colors.lightBlue, borderRadius: 14, padding: 14, marginTop: 18 },
  locationTitle: { fontWeight: '700', color: Colors.darkBlue },
  locationValue: { color: Colors.darkBlue, marginTop: 4, fontSize: 13 },
  distanceText: { marginTop: 10, color: Colors.primaryBlue, fontWeight: '600' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.black, marginTop: 24, marginBottom: 10 },
  reviewForm: { marginBottom: 14 },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, marginTop: 8, backgroundColor: Colors.lightGray,
  },
  reviewItem: { borderTopWidth: 1, borderTopColor: Colors.border, paddingVertical: 10 },
  reviewAuthor: { fontWeight: '700', color: Colors.black, marginTop: 4 },
  reviewComment: { color: Colors.gray, marginTop: 2 },
});
