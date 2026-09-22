import { RefreshCw } from 'lucide-react';
import type { Tab } from './Sidebar';

interface HeaderProps {
    activeTab: Tab;
    busy: boolean;
    onRefresh: () => Promise<void>;
}

const titles: Record<Tab, string> = {
    dashboard: 'Overview',
    customers: 'Customers',
    reservations: 'Reservations',
};

export default function Header({
                                   activeTab,
                                   busy,
                                   onRefresh,
                               }: HeaderProps) {
    return (
        <header>
            <div>
                <p className="eyebrow">Parking operations</p>
                <h1>{titles[activeTab]}</h1>
            </div>

            <button
                type="button"
                className="secondary"
                onClick={() => void onRefresh()}
                disabled={busy}
            >
                <RefreshCw
                    size={17}
                    className={busy ? 'spin' : ''}
                />

                {busy ? 'Refreshing...' : 'Refresh'}
            </button>
        </header>
    );
}