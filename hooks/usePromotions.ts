// hooks/usePromotions.ts
// Hook que centraliza el estado de las promociones recibidas.

import { useEffect, useState, useCallback } from 'react';
import {
  Promotion,
  addPromotionListener,
  requestNotificationPermission,
  sendTestPromotion,
} from '../services/notificationService';

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    (async () => {
      const granted = await requestNotificationPermission();
      setPermissionGranted(granted);

      unsubscribe = addPromotionListener((promo) => {
        setPromotions((prev) => [promo, ...prev]);
      });
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const simulatePromotion = useCallback(async () => {
    await sendTestPromotion();
  }, []);

  return { promotions, permissionGranted, simulatePromotion };
}
