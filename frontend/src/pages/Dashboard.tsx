import {
    CalendarCheck,
    Car,
    SquareParking,
    Users,
} from 'lucide-react';

import Metric from '../components/Metric';
import ReservationTable from '../components/ReservationTable';

import type {
    Customer,
    ParkingSpot,
    Reservation,
} from '../types';

interface DashboardProps {
    spots: ParkingSpot[];
    activeReservations: Reservation[];
    customers: Customer[];
    available: number;
    onCheckout: (id: string) => Promise<void>;
}

export default function Dashboard({
                                      spots,
                                      activeReservations,
                                      customers,
                                      available,
                                      onCheckout,
                                  }: DashboardProps) {
    return (
        <>
            <section className="metrics">
                <Metric
                    label="Available spaces"
                    value={`${available}/${spots.length}`}
                    icon={SquareParking}
                />

                <Metric
                    label="Active reservations"
                    value={activeReservations.length}
                    icon={CalendarCheck}
                />

                <Metric
                    label="Registered customers"
                    value={customers.length}
                    icon={Users}
                />
            </section>

            <section className="panel">
                <div className="panel-head">
                    <div>
                        <h2>Parking lot</h2>
                        <p>Live availability across all spaces</p>
                    </div>

                    <div className="legend">
                        <i />
                        Available

                        <i className="occupied" />
                        Occupied
                    </div>
                </div>

                <div className="spots">
                    {spots.map((spot) => (
                        <div
                            key={spot.id}
                            className={`spot ${
                                spot.available ? '' : 'taken'
                            }`}
                        >
                            <Car size={22} />

                            <strong>{spot.id}</strong>

                            <span>
                {spot.available
                    ? 'Available'
                    : 'Occupied'}
              </span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="panel">
                <div className="panel-head">
                    <div>
                        <h2>Active reservations</h2>
                        <p>Vehicles currently parked</p>
                    </div>
                </div>

                <ReservationTable
                    data={activeReservations}
                    onCheckout={onCheckout}
                />
            </section>
        </>
    );
}