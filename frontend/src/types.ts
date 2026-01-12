// src/types.ts

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export enum PaymentMethod {
  ABA_PAY = "ABA_PAY",
  STRIPE = "STRIPE",
  CREDIT_CARD = "CREDIT_CARD",
  PAY_LATER = "PAY_LATER",
}

export enum RecurrencePattern {
  NONE = "NONE",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export type UserRole = 0 | 1 | 2; // adjust if you use enums elsewhere

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  timezone: string;
  phone?: string;
  createdAt: string;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  phone: string;
  timezone: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  durationMinutes: number;
  maxCapacity: number;
  isActive: boolean;
  locationIds: string[];
  imageUrl?: string;
};

export type Staff = {
  id: string;
  fullName: string;
  locationIds: string[];
  assignedServices: string[];
  specialties: string[];
};

export type Booking = {
  id: string;
  locationId: string;
  serviceId: string;
  staffId: string;
  customerId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  paidAmount: number;
  notes?: string;
  recurrencePattern: RecurrencePattern;
  createdAt: string;
};
