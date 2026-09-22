import {
    useState,
    type FormEvent,
} from 'react';

import { Plus } from 'lucide-react';

import ReservationTable from '../components/ReservationTable';

import type {
    CreateReservationRequest,
    Customer,
    ParkingSpot,
    Reservation,
} from '../types';

interface ReservationsProps {
    data: Reservation[];
    customers: Customer[];
    spots: ParkingSpot[];

    onCreate: (
        data: CreateReservationRequest
    ) => Promise<void>;

    onCheckout: (
        id: string
    ) => Promise<void>;

    onCancel: (
        id: string
    ) => Promise<void>;
}

interface ReservationForm {
    customerId: string;
    spotId: string;
    hours: string;
}

const initialForm: ReservationForm = {
    customerId: '',
    spotId: '',
    hours: '2',
};

export default function Reservations({
                                         data,
                                         customers,
                                         spots,
                                         onCreate,
                                         onCheckout,
                                         onCancel,
                                     }: ReservationsProps) {
    const [form, setForm] =
        useState<ReservationForm>(initialForm);

    const [submitting, setSubmitting] =
        useState(false);

    const availableSpots = spots.filter(
        (spot) => spot.available
    );

    const submit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const spotId = Number(form.spotId);
        const hours = Number(form.hours);

        if (!form.customerId || !Number.isFinite(spotId)) {
            return;
        }

        if (
            !Number.isFinite(hours) ||
            hours < 0.5 ||
            hours > 24
        ) {
            return;
        }

        try {
            setSubmitting(true);

            await onCreate({
                customerId: form.customerId,
                spotId,
                hours,
            });

            setForm({
                customerId: form.customerId,
                spotId: '',
                hours: form.hours,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className="panel form-panel">
                <div>
                    <h2>New reservation</h2>
                    <p>
                        Assign an available space to a customer.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <select
                        required
                        value={form.customerId}
                        disabled={submitting}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                customerId: event.target.value,
                            })
                        }
                    >
                        <option value="">
                            Select customer
                        </option>

                        {customers.map((customer) => (
                            <option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.name} ·{' '}
                                {customer.plateNumber}
                            </option>
                        ))}
                    </select>

                    <select
                        required
                        value={form.spotId}
                        disabled={submitting}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                spotId: event.target.value,
                            })
                        }
                    >
                        <option value="">
                            Select space
                        </option>

                        {availableSpots.map((spot) => (
                            <option
                                key={spot.id}
                                value={spot.id}
                            >
                                Space {spot.id}
                            </option>
                        ))}
                    </select>

                    <input
                        required
                        type="number"
                        min="0.5"
                        max="24"
                        step="0.5"
                        value={form.hours}
                        disabled={submitting}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                hours: event.target.value,
                            })
                        }
                    />

                    <button
                        type="submit"
                        disabled={
                            submitting ||
                            customers.length === 0 ||
                            availableSpots.length === 0
                        }
                    >
                        <Plus size={17} />

                        {submitting
                            ? 'Reserving...'
                            : 'Reserve'}
                    </button>
                </form>
            </section>

            <section className="panel">
                <div className="panel-head">
                    <div>
                        <h2>Reservation history</h2>
                        <p>All parking activity</p>
                    </div>
                </div>

                <ReservationTable
                    data={data}
                    onCheckout={onCheckout}
                    onCancel={onCancel}
                />
            </section>
        </>
    );
}