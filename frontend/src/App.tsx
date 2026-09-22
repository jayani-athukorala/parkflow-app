import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import Sidebar, {
    type Tab,
} from './components/Sidebar';

import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Reservations from './pages/Reservations';

import { api } from './services/api';

import type {
    CreateCustomerRequest,
    CreateReservationRequest,
    Customer,
    ParkingSpot,
    Reservation,
} from './types';

import { getErrorMessage } from './utils/format';

export default function App() {
    const [customers, setCustomers] =
        useState<Customer[]>([]);

    const [spots, setSpots] =
        useState<ParkingSpot[]>([]);

    const [reservations, setReservations] =
        useState<Reservation[]>([]);

    const [tab, setTab] =
        useState<Tab>('dashboard');

    const [error, setError] =
        useState('');

    const [notice, setNotice] =
        useState('');

    const [busy, setBusy] =
        useState(false);

    const refresh = useCallback(async () => {
        setBusy(true);
        setError('');

        try {
            const [
                customersResponse,
                spotsResponse,
                reservationsResponse,
            ] = await Promise.all([
                api.customers(),
                api.spots(),
                api.reservations(),
            ]);

            setCustomers(customersResponse);
            setSpots(spotsResponse);
            setReservations(reservationsResponse);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setBusy(false);
        }
    }, []);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const activeReservations = useMemo(
        () =>
            reservations.filter(
                (reservation) =>
                    reservation.status === 'ACTIVE'
            ),
        [reservations]
    );

    const availableSpaces = useMemo(
        () =>
            spots.filter(
                (spot) => spot.available
            ).length,
        [spots]
    );

    async function executeAction(
        action: () => Promise<unknown>,
        successMessage: string
    ): Promise<void> {
        setError('');
        setNotice('');

        try {
            await action();

            await refresh();

            setNotice(successMessage);
        } catch (error) {
            setError(getErrorMessage(error));

            throw error;
        }
    }

    const handleCreateCustomer = (
        data: CreateCustomerRequest
    ): Promise<void> => {
        return executeAction(
            () => api.createCustomer(data),
            'Customer registered successfully.'
        );
    };

    const handleCreateReservation = (
        data: CreateReservationRequest
    ): Promise<void> => {
        return executeAction(
            () => api.createReservation(data),
            'Reservation created successfully.'
        );
    };

    const handleCheckout = (
        id: string
    ): Promise<void> => {
        return executeAction(
            () => api.checkout(id),
            'Checkout completed successfully.'
        );
    };

    const handleCancel = (
        id: string
    ): Promise<void> => {
        return executeAction(
            () => api.cancel(id),
            'Reservation cancelled successfully.'
        );
    };

    return (
        <div className="shell">
            <Sidebar
                activeTab={tab}
                onTabChange={setTab}
            />

            <main>
                <Header
                    activeTab={tab}
                    busy={busy}
                    onRefresh={refresh}
                />

                {error && (
                    <div
                        className="alert error"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {notice && (
                    <div
                        className="alert success"
                        role="status"
                    >
                        {notice}
                    </div>
                )}

                {tab === 'dashboard' && (
                    <Dashboard
                        spots={spots}
                        activeReservations={
                            activeReservations
                        }
                        customers={customers}
                        available={availableSpaces}
                        onCheckout={handleCheckout}
                    />
                )}

                {tab === 'customers' && (
                    <Customers
                        data={customers}
                        onCreate={handleCreateCustomer}
                    />
                )}

                {tab === 'reservations' && (
                    <Reservations
                        data={reservations}
                        customers={customers}
                        spots={spots}
                        onCreate={
                            handleCreateReservation
                        }
                        onCheckout={handleCheckout}
                        onCancel={handleCancel}
                    />
                )}
            </main>
        </div>
    );
}