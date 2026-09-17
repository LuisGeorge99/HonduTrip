// services/notificationService.ts
// Encargado de "Recibir promoción": permisos, escucha y disparo
// de notificaciones locales de tipo promoción.
// Requiere: npx expo install expo-notifications

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export interface Promotion {
  id: string;
  title: string;
  body: string;
  discount?: string;
  receivedAt: string; // ISO date
}

// Cómo se comporta la notificación cuando la app está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// --- Pedir permiso al usuario ---
export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('promotions', {
      name: 'Promociones',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  return finalStatus === 'granted';
}

// --- Escuchar promociones entrantes (push o locales) ---
export function addPromotionListener(
  onReceive: (promotion: Promotion) => void
) {
  const subscription = Notifications.addNotificationReceivedListener((notif) => {
    const content = notif.request.content;
    const promo: Promotion = {
      id: notif.request.identifier,
      title: content.title ?? 'Nueva promoción',
      body: content.body ?? '',
      discount: (content.data?.discount as string) ?? undefined,
      receivedAt: new Date().toISOString(),
    };
    onReceive(promo);
  });

  return () => subscription.remove();
}

// --- Simular / disparar una promoción de prueba (útil en desarrollo) ---
export async function sendTestPromotion(
  title = 'Nueva promoción',
  body = '20% de descuento en paquetes de aventura.',
  discount = '20%'
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { type: 'promotion', discount },
    },
    trigger: null, // se dispara casi de inmediato
  });
}
