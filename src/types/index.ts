export type Role = 'USER' | 'ADMIN';
export type RoomStatus = 'ABIERTA' | 'LLENA' | 'CERRADA' | 'SORTEANDO' | 'FINALIZADA';
export type TicketStatus = 'ACTIVO' | 'GANADOR' | 'NO_GANADOR' | 'CANCELADO';
export type AccountType = 'AHORRO' | 'CORRIENTE';
export type PayoutStatus = 'PENDIENTE' | 'PAGADO';

export interface BankAccount {
  id?: string;
  bankName: string;
  accountType: AccountType;
  accountNumber: string;
  accountHolder?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dui: string;
  role: Role;
  phoneVerified: boolean;
  emailVerified: boolean;
  bankAccount?: BankAccount | null;
}

export interface Room {
  id: string;
  nombre: string;
  premio: number;
  costoPase: number;
  capacidadMax: number;
  horaApertura: string;
  horaSorteo: string;
  estado: RoomStatus;
  ticketsSold: number;
  winnerUserId?: string | null;
  winnerTicketId?: string | null;
  _count?: {
    tickets: number;
  };
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  roomId: string;
  userId: string;
  precio: number;
  estado: TicketStatus;
  createdAt: string;
  room?: Room;
  user?: {
    fullName: string;
    dui: string;
  };
}

export interface Sorteo {
  id: string;
  roomId: string;
  ganadorUserId: string;
  ticketGanadorId: string;
  montoPremio: number;
  fechaSorteo: string;
  estadoPago: PayoutStatus;
  fechaPago?: string | null;
  notasPago?: string | null;
  room?: Room;
  ganador?: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    dui: string;
    bankAccount?: BankAccount | null;
  };
}

export interface GameConfig {
  id: number;
  maxParticipacionesDia: number;
  maxVictoriasDia: number;
  updatedAt: string;
}

export interface DashboardMetrics {
  totalTicketsSold: number;
  totalRevenue: number;
  totalUsers: number;
  activeRoomsCount: number;
  pendingPayoutsCount: number;
  ticketsToday: number;
  date: string;
}
