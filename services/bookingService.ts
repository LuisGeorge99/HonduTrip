// services/bookingService.ts
export type BookingStatus = 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada';

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  date: string; // ISO
  people: number;
  total: number;
  status: BookingStatus;
}

const bookings: Booking[] = [
  { id: 'BOOK-1001', packageId: 'pkg-playa', packageName: 'Paquete Playa - Roatán', date: '2026-10-15', people: 2, total: 300, status: 'Confirmada' },
  { id: 'BOOK-1002', packageId: 'pkg-cultural', packageName: 'Paquete Cultural - Copán Ruinas', date: '2026-08-05', people: 1, total: 135, status: 'Completada' },
  { id: 'BOOK-1003', packageId: 'pkg-aventura', packageName: 'Paquete Aventura - La Ceiba', date: '2026-11-20', people: 3, total: 360, status: 'Pendiente' },
];

export async function createBooking(input: Omit<Booking, 'id' | 'status'>): Promise<Booking> {
  await new Promise((r) => setTimeout(r, 500));
  const booking: Booking = { ...input, id: `BOOK-${Date.now()}`, status: 'Pendiente' };
  bookings.unshift(booking);
  return booking;
}

export async function getBookings(): Promise<Booking[]> {
  await new Promise((r) => setTimeout(r, 200));
  return bookings;
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  await new Promise((r) => setTimeout(r, 150));
  return bookings.find((b) => b.id === id);
}

export async function cancelBooking(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  const booking = bookings.find((b) => b.id === id);
  if (booking) booking.status = 'Cancelada';
}

export async function confirmBooking(id: string): Promise<void> {
  const booking = bookings.find((b) => b.id === id);
  if (booking) booking.status = 'Confirmada';
}
