import type {
    CreateCustomerRequest,
    CreateReservationRequest,
    Customer,
    ParkingSpot,
    Reservation,
} from '../types';

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function request<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let message = `Request failed with status ${response.status}`;

        try {
            const body = (await response.json()) as {
                message?: string;
                error?: string;
            };

            message = body.message || body.error || message;
        } catch {
            // Response did not contain JSON.
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export const api = {
    customers(): Promise<Customer[]> {
        return request<Customer[]>('/customers');
    },

    createCustomer(
        data: CreateCustomerRequest
    ): Promise<Customer> {
        return request<Customer>('/customers', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    spots(): Promise<ParkingSpot[]> {
        return request<ParkingSpot[]>('/parking-spots');
    },

    reservations(): Promise<Reservation[]> {
        return request<Reservation[]>('/reservations');
    },

    createReservation(
        data: CreateReservationRequest
    ): Promise<Reservation> {
        return request<Reservation>('/reservations', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    checkout(reservationId: string): Promise<Reservation> {
        return request<Reservation>(
            `/reservations/${reservationId}/checkout`,
            {
                method: 'POST',
            }
        );
    },

    cancel(reservationId: string): Promise<Reservation> {
        return request<Reservation>(
            `/reservations/${reservationId}/cancel`,
            {
                method: 'POST',
            }
        );
    },
};