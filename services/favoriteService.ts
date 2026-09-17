// services/favoriteService.ts
export type FavoriteType = 'destination' | 'package' | 'hotel';

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  refId: string;
  name: string;
  image: string;
}

let favorites: FavoriteItem[] = [
  { id: 'fav-1', type: 'destination', refId: 'roatan', name: 'Roatán', image: 'https://placehold.co/200x140/1565C0/FFFFFF?text=Roatan' },
  { id: 'fav-2', type: 'hotel', refId: 'hotel-paradise', name: 'Hotel Paradise', image: 'https://placehold.co/200x140/0FA968/FFFFFF?text=Hotel+Paradise' },
];

export async function getFavorites(): Promise<FavoriteItem[]> {
  await new Promise((r) => setTimeout(r, 200));
  return favorites;
}

export function isFavorite(refId: string): boolean {
  return favorites.some((f) => f.refId === refId);
}

export async function toggleFavorite(item: Omit<FavoriteItem, 'id'>): Promise<boolean> {
  const existing = favorites.find((f) => f.refId === item.refId);
  if (existing) {
    favorites = favorites.filter((f) => f.refId !== item.refId);
    return false;
  }
  favorites = [{ ...item, id: `fav-${Date.now()}` }, ...favorites];
  return true;
}
