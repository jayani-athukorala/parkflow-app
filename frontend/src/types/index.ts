export interface Customer {
    id: string;
    name: string;
    phone: string;
    plateNumber: string;
    createdAt: string;
}

export interface ParkingSpot {
    id: number;
    available: boolean;
}

export type ReservationStatus =
    | 'ACTIVE'
    | 'COMPLETED'
    | 'CANCELLED';

export interface Reservation {
    id: string;
    customer: Customer;
    spot: ParkingSpot;
    startTime: string;
    scheduledEndTime: string;
    actualEndTime: string | null;
    status: ReservationStatus;
}

export interface CreateCustomerRequest {
    name: string;
    phone: string;
    plateNumber: string;
}

export interface CreateReservationRequest {
    customerId: string;
    spotId: number;
    hours: number;
}