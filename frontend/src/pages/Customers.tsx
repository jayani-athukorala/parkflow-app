import {
    useState,
    type FormEvent,
} from 'react';

import { Plus } from 'lucide-react';

import type {
    CreateCustomerRequest,
    Customer,
} from '../types';

import { formatDateTime } from '../utils/format';

interface CustomersProps {
    data: Customer[];
    onCreate: (
        data: CreateCustomerRequest
    ) => Promise<void>;
}

const initialForm: CreateCustomerRequest = {
    name: '',
    phone: '',
    plateNumber: '',
};

export default function Customers({
                                      data,
                                      onCreate,
                                  }: CustomersProps) {
    const [form, setForm] =
        useState<CreateCustomerRequest>(initialForm);

    const [submitting, setSubmitting] =
        useState(false);

    const submit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSubmitting(true);

            await onCreate({
                name: form.name.trim(),
                phone: form.phone.trim(),
                plateNumber: form.plateNumber
                    .trim()
                    .toUpperCase(),
            });

            setForm(initialForm);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className="panel form-panel">
                <div>
                    <h2>Register customer</h2>
                    <p>
                        Create a customer and link their vehicle.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <input
                        required
                        minLength={2}
                        placeholder="Full name"
                        value={form.name}
                        disabled={submitting}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                name: event.target.value,
                            })
                        }
                    />

                    <input
                        required
                        pattern="\d{10}"
                        inputMode="numeric"
                        placeholder="Phone · 10 digits"
                        value={form.phone}
                        disabled={submitting}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                phone: event.target.value,
                            })
                        }
                    />

                    <input
                        required
                        placeholder="Plate · ABC-1234"
                        value={form.plateNumber}
                        disabled={submitting}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                plateNumber:
                                    event.target.value.toUpperCase(),
                            })
                        }
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                    >
                        <Plus size={17} />

                        {submitting
                            ? 'Registering...'
                            : 'Register'}
                    </button>
                </form>
            </section>

            <section className="panel">
                <div className="panel-head">
                    <div>
                        <h2>Customer directory</h2>
                        <p>
                            {data.length} registered customers
                        </p>
                    </div>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            <th>Customer</th>
                            <th>ID</th>
                            <th>Phone</th>
                            <th>Vehicle</th>
                            <th>Registered</th>
                        </tr>
                        </thead>

                        <tbody>
                        {data.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <strong>
                                        {customer.name}
                                    </strong>
                                </td>

                                <td className="mono">
                                    {customer.id}
                                </td>

                                <td>
                                    {customer.phone}
                                </td>

                                <td>
                    <span className="plate">
                      {customer.plateNumber}
                    </span>
                                </td>

                                <td>
                                    {formatDateTime(
                                        customer.createdAt
                                    )}
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="empty"
                                >
                                    No customers registered yet.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}