// app/notifications/promotions.tsx
// Pantalla "Recibir promoción": muestra las promociones que van
// llegando por notificación y permite simular una nueva (modo prueba).

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/colors';
import { usePromotions } from '../../hooks/usePromotions';
import { Promotion } from '../../services/notificationService';

function PromotionCard({ promo }: { promo: Promotion }) {
  const date = new Date(promo.receivedAt);
  const time = date.toLocaleTimeString('es-HN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Text style={{ fontSize: 20 }}>🔔</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{promo.title}</Text>
        <Text style={styles.cardBody}>{promo.body}</Text>
        <View style={styles.cardFooter}>
          {promo.discount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{promo.discount} OFF</Text>
            </View>
          )}
          <Text style={styles.cardTime}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

export default function PromotionsScreen() {
  const { promotions, permissionGranted, simulatePromotion } =
    usePromotions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promociones</Text>

      {!permissionGranted && (
        <View style={styles.warningBanner}>
          <Text style={styles.warningText}>
            Activa las notificaciones para no perderte ninguna promoción.
          </Text>
        </View>
      )}

      {promotions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>🌴</Text>
          <Text style={styles.emptyText}>
            Aún no has recibido promociones.
          </Text>
        </View>
      ) : (
        <FlatList
          data={promotions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PromotionCard promo={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Botón de prueba: dispara una promoción local de ejemplo */}
      <TouchableOpacity style={styles.testButton} onPress={simulatePromotion}>
        <Text style={styles.testButtonText}>Simular promoción</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 16,
  },
  warningBanner: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  warningText: {
    color: Colors.darkBlue,
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: Colors.gray,
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryGreen,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
  },
  cardBody: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    backgroundColor: Colors.primaryGreen,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  cardTime: {
    color: Colors.gray,
    fontSize: 11,
  },
  testButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
