// services/paymentService.ts
// Lógica de "Confirmar pago" para una reserva de HonduTrip.
// En un backend real, aquí llamarías a tu API / pasarela de pago
// (Stripe, PayPal, etc). Por ahora se simula la respuesta.

export type PaymentMethod = 'card' | 'transfer' | 'cash';

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiry: string; // MM/AA
  cvv: string;
}

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  card?: CardDetails;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
}

// --- Validaciones básicas de tarjeta ---
export function validateCard(card: CardDetails): string | null {
  const cleanNumber = card.cardNumber.replace(/\s/g, '');

  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return 'Número de tarjeta inválido.';
  }
  if (!card.cardHolder.trim()) {
    return 'Ingresa el nombre del titular.';
  }
  if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
    return 'Formato de vencimiento inválido (MM/AA).';
  }
  if (!/^\d{3,4}$/.test(card.cvv)) {
    return 'CVV inválido.';
  }
  return null;
}

// --- Confirmar pago ---
export async function confirmPayment(
  request: PaymentRequest
): Promise<PaymentResult> {
  if (request.method === 'card') {
    if (!request.card) {
      return { success: false, message: 'Faltan los datos de la tarjeta.' };
    }
    const error = validateCard(request.card);
    if (error) {
      return { success: false, message: error };
    }
  }

  // Simulación de llamada a pasarela de pago (latencia de red)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulación de éxito (aquí normalmente vendría la respuesta real del backend)
  const transactionId = `TXN-${Date.now()}`;

  return {
    success: true,
    transactionId,
    message: 'Pago confirmado correctamente.',
  };
}
