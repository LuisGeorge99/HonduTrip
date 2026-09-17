// services/hotelService.ts
export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  price: number;
  rating: number;
  services: string[];
  image: string;
  availability: boolean;
}

export const hotels: Hotel[] = [
  { id: 'hotel-paradise', name: 'Hotel Paradise', destinationId: 'roatan', price: 90, rating: 4.7, services: ['Piscina', 'Wifi', 'Desayuno incluido', 'Playa privada'], image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Hotel+Paradise', availability: true },
  { id: 'hotel-colonial', name: 'Posada Colonial', destinationId: 'copan', price: 55, rating: 4.4, services: ['Wifi', 'Desayuno incluido', 'Parqueo'], image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Posada+Colonial', availability: true },
  { id: 'hotel-ceiba', name: 'Hotel Bahía', destinationId: 'laceiba', price: 60, rating: 4.3, services: ['Wifi', 'Piscina', 'Restaurante'], image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Hotel+Bahia', availability: false },
  { id: 'hotel-yojoa', name: 'Cabañas del Lago', destinationId: 'yojoa', price: 70, rating: 4.6, services: ['Wifi', 'Kayak', 'Restaurante'], image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Cabanas+del+Lago', availability: true },
];

export async function getHotels(destinationId?: string): Promise<Hotel[]> {
  await new Promise((r) => setTimeout(r, 300));
  return hotels.filter((h) => !destinationId || h.destinationId === destinationId);
}

export async function getHotelById(id: string): Promise<Hotel | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return hotels.find((h) => h.id === id);
}
