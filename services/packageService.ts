// services/packageService.ts
export interface TravelPackage {
  id: string;
  name: string;
  type: 'Playa' | 'Aventura' | 'Cultural' | 'Romántico' | 'Familiar';
  destinationId: string;
  description: string;
  includes: string[];
  price: number;
  image: string;
  rating: number;
}

export const packages: TravelPackage[] = [
  { id: 'pkg-playa', name: 'Paquete Playa', type: 'Playa', destinationId: 'roatan', description: 'Transporte, hotel, desayuno, tour y snorkel en Roatán.', includes: ['Transporte', 'Hotel', 'Desayuno', 'Tour', 'Snorkel / paseo en lancha'], price: 150, image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Paquete+Playa', rating: 4.8 },
  { id: 'pkg-aventura', name: 'Paquete Aventura', type: 'Aventura', destinationId: 'picobonito', description: 'Entrada al parque, guía, canopy y senderismo en Pico Bonito.', includes: ['Transporte', 'Entrada al parque', 'Guía', 'Canopy / senderismo', 'Almuerzo'], price: 120, image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Paquete+Aventura', rating: 4.9 },
  { id: 'pkg-cultural', name: 'Paquete Cultural', type: 'Cultural', destinationId: 'copan', description: 'Recorrido histórico y museos en Copán Ruinas.', includes: ['Transporte', 'Hotel', 'Museos', 'Recorrido histórico', 'Guía'], price: 135, image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Paquete+Cultural', rating: 4.6 },
  { id: 'pkg-romantico', name: 'Paquete Romántico', type: 'Romántico', destinationId: 'tela', description: 'Hotel, cena, decoración y paseo privado en Tela.', includes: ['Hotel', 'Cena', 'Decoración', 'Paseo privado'], price: 210, image: 'https://placehold.co/400x240/0FA968/FFFFFF?text=Paquete+Romantico', rating: 4.7 },
  { id: 'pkg-familiar', name: 'Paquete Familiar', type: 'Familiar', destinationId: 'yojoa', description: 'Transporte, hotel, alimentación y actividades en el Lago de Yojoa.', includes: ['Transporte', 'Hotel', 'Alimentación', 'Actividades'], price: 175, image: 'https://placehold.co/400x240/1565C0/FFFFFF?text=Paquete+Familiar', rating: 4.5 },
];

export async function getPackages(type?: string): Promise<TravelPackage[]> {
  await new Promise((r) => setTimeout(r, 300));
  return packages.filter((p) => !type || type === 'Todos' || p.type === type);
}

export async function getPackageById(id: string): Promise<TravelPackage | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return packages.find((p) => p.id === id);
}
