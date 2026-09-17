// services/destinationService.ts
export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  category: 'Playa' | 'Aventura' | 'Cultural' | 'Naturaleza';
  rating: number;
}

export const destinations: Destination[] = [
  { id: 'roatan', name: 'Roatán', description: 'Isla paradisíaca con el mejor buceo de Honduras.', image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Roatan', latitude: 16.3249, longitude: -86.5372, category: 'Playa', rating: 4.8 },
  { id: 'copan', name: 'Copán Ruinas', description: 'Sitio arqueológico maya declarado Patrimonio de la Humanidad.', image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Copan+Ruinas', latitude: 14.8391, longitude: -89.1467, category: 'Cultural', rating: 4.7 },
  { id: 'laceiba', name: 'La Ceiba', description: 'Puerta de entrada a las Islas de la Bahía y capital del ecoturismo.', image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=La+Ceiba', latitude: 15.7597, longitude: -86.7822, category: 'Aventura', rating: 4.5 },
  { id: 'utila', name: 'Utila', description: 'Ideal para bucear con tiburones ballena.', image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Utila', latitude: 16.1000, longitude: -86.9000, category: 'Playa', rating: 4.6 },
  { id: 'tela', name: 'Tela', description: 'Playas tranquilas y el Jardín Botánico Lancetilla.', image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Tela', latitude: 15.7794, longitude: -87.4636, category: 'Playa', rating: 4.4 },
  { id: 'yojoa', name: 'Lago de Yojoa', description: 'El lago natural más grande de Honduras.', image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Lago+de+Yojoa', latitude: 14.8833, longitude: -88.0333, category: 'Naturaleza', rating: 4.6 },
  { id: 'picobonito', name: 'Pico Bonito', description: 'Parque nacional con senderismo y cascadas.', image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Pico+Bonito', latitude: 15.5333, longitude: -86.9833, category: 'Aventura', rating: 4.9 },
  { id: 'gracias', name: 'Gracias', description: 'Ciudad colonial a los pies de Celaque.', image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Gracias', latitude: 14.5833, longitude: -88.5833, category: 'Cultural', rating: 4.3 },
];

export async function getDestinations(query?: string, category?: string): Promise<Destination[]> {
  await new Promise((r) => setTimeout(r, 300));
  return destinations.filter((d) =>
    (!query || d.name.toLowerCase().includes(query.toLowerCase())) &&
    (!category || category === 'Todos' || d.category === category)
  );
}

export async function getDestinationById(id: string): Promise<Destination | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return destinations.find((d) => d.id === id);
}

// distancia aproximada en km entre el usuario y un destino (fórmula haversine)
export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
