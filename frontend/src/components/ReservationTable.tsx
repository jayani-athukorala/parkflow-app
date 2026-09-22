import {
    LogOut,
    XCircle,
} from 'lucide-react';

import type { Reservation } from '../types';
import { formatDateTime } from '../utils/format';

interface ReservationTableProps {
    data: Reservation[];
    onCheckout: (id: string) => Promise<void>;
    onCancel?: (id: string) => Promise<void>;
}

export default function ReservationTable({
                                             data,
                                             onCheckout,
                                             onCancel,
                                         }: ReservationTableProps) {
    if (data.length === 0) {
        return (
            <div className="empty">
                No reservations to show.
            </div>
        );
    }

    return (
        <div className="table-wrap">
            <table>
                <thead>
                <tr>
                    <th>Reservation</th>
                    <th>Customer / vehicle</th>
                    <th>Space</th>
                    <th>Started</th>
                    <th>Ends</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {data.map((reservation) => (
                    <tr key={reservation.id}>
                        <td className="mono">
                            {reservation.id}
                        </td>

                        <td>
                            <strong>
                                {reservation.customer.name}
                            </strong>

                            <small>
                                {reservation.customer.plateNumber}
                            </small>
                        </td>

                        <td>
                            #{reservation.spot.id}
                        </td>

                        <td>
                            {formatDateTime(reservation.startTime)}
                        </td>

                        <td>
                            {formatDateTime(
                                reservation.actualEndTime ||
                                reservation.scheduledEndTime
                            )}
                        </td>

                        <td>
                <span
                    className={`badge ${reservation.status.toLowerCase()}`}
                >
                  {reservation.status}
                </span>
                        </td>

                        <td className="actions">
                            {reservation.status === 'ACTIVE' && (
                                <>
                                    <button
                                        type="button"
                                        title="Checkout"
                                        aria-label={`Checkout reservation ${reservation.id}`}
                                        className="icon-btn"
                                        onClick={() =>
                                            void onCheckout(reservation.id)
                                        }
                                    >
                                        <LogOut size={17} />
                                    </button>

                                    {onCancel && (
                                        <button
                                            type="button"
                                            title="Cancel"
                                            aria-label={`Cancel reservation ${reservation.id}`}
                                            className="icon-btn danger"
                                            onClick={() =>
                                                void onCancel(reservation.id)
                                            }
                                        >
                                            <XCircle size={17} />
                                        </button>
                                    )}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}