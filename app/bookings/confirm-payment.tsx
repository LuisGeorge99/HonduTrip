// app/bookings/confirm-payment.tsx
// Pantalla "Confirmar pago" de una reserva.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constants/colors';
import {
  confirmPayment,
  PaymentMethod,
  CardDetails,
} from '../../services/paymentService';

export default function ConfirmPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    packageName?: string;
    total?: string;
    bookingId?: string;
  }>();

  // Datos de ejemplo si no llegan por navegación
  const packageName = params.packageName ?? 'Paquete Playa - Roatán';
  const total = Number(params.total ?? 150);
  const bookingId = params.bookingId ?? 'BOOK-0001';

  const [method, setMethod] = useState<PaymentMethod>('card');
  const [card, setCard] = useState<CardDetails>({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const result = await confirmPayment({
      bookingId,
      amount: total,
      method,
      card: method === 'card' ? card : undefined,
    });
    setLoading(false);

    if (result.success) {
      Alert.alert('¡Pago confirmado! ✅', result.message, [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } else {
      Alert.alert('No se pudo procesar el pago', result.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Confirmar pago</Text>

      {/* Resumen de la reserva */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Reserva</Text>
        <Text style={styles.summaryValue}>{packageName}</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.summaryLabel}>Total a pagar</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Selección de método de pago */}
      <Text style={styles.sectionTitle}>Método de pago</Text>
      <View style={styles.methodRow}>
        {(
          [
            { key: 'card', label: 'Tarjeta' },
            { key: 'transfer', label: 'Transferencia' },
            { key: 'cash', label: 'Efectivo' },
          ] as { key: PaymentMethod; label: string }[]
        ).map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.methodButton,
              method === option.key && styles.methodButtonActive,
            ]}
            onPress={() => setMethod(option.key)}
          >
            <Text
              style={[
                styles.methodButtonText,
                method === option.key && styles.methodButtonTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Formulario de tarjeta */}
      {method === 'card' && (
        <View style={styles.form}>
          <Text style={styles.label}>Número de tarjeta</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            maxLength={19}
            value={card.cardNumber}
            onChangeText={(v) => setCard({ ...card, cardNumber: v })}
          />

          <Text style={styles.label}>Nombre del titular</Text>
          <TextInput
            style={styles.input}
            placeholder="Como aparece en la tarjeta"
            value={card.cardHolder}
            onChangeText={(v) => setCard({ ...card, cardHolder: v })}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Vencimiento</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                maxLength={5}
                value={card.expiry}
                onChangeText={(v) => setCard({ ...card, expiry: v })}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                value={card.cvv}
                onChangeText={(v) => setCard({ ...card, cvv: v })}
              />
            </View>
          </View>
        </View>
      )}

      {method === 'transfer' && (
        <Text style={styles.infoText}>
          Realiza la transferencia a la cuenta de HonduTrip y presiona
          "Confirmar pago" para notificar tu reserva.
        </Text>
      )}

      {method === 'cash' && (
        <Text style={styles.infoText}>
          Pagarás en efectivo al llegar al destino. Presiona "Confirmar pago"
          para reservar tu lugar.
        </Text>
      )}

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirm}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.confirmButtonText}>Confirmar pago</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.gray,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primaryGreen,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  methodRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    alignItems: 'center',
  },
  methodButtonActive: {
    backgroundColor: Colors.primaryBlue,
  },
  methodButtonText: {
    color: Colors.primaryBlue,
    fontWeight: '600',
    fontSize: 13,
  },
  methodButtonTextActive: {
    color: Colors.white,
  },
  form: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.lightGray,
  },
  infoText: {
    color: Colors.gray,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
