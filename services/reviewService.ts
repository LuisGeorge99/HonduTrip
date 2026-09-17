// services/reviewService.ts
export interface Review {
  id: string;
  targetId: string; // id del destino/paquete/hotel
  author: string;
  rating: number;
  comment: string;
  image?: string;
  createdAt: string;
}

let reviews: Review[] = [
  { id: 'rev-1', targetId: 'roatan', author: 'María G.', rating: 5, comment: 'Excelente lugar, el agua es cristalina.', createdAt: '2026-07-02' },
  { id: 'rev-2', targetId: 'copan', author: 'Carlos R.', rating: 4, comment: 'Muy buena guía histórica, recomendado.', createdAt: '2026-06-18' },
];

export async function getReviews(targetId: string): Promise<Review[]> {
  await new Promise((r) => setTimeout(r, 200));
  return reviews.filter((r) => r.targetId === targetId);
}

export async function addReview(input: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  await new Promise((r) => setTimeout(r, 400));
  const review: Review = { ...input, id: `rev-${Date.now()}`, createdAt: new Date().toISOString() };
  reviews = [review, ...reviews];
  return review;
}

export function averageRating(targetId: string): number {
  const items = reviews.filter((r) => r.targetId === targetId);
  if (items.length === 0) return 0;
  return items.reduce((sum, r) => sum + r.rating, 0) / items.length;
}
