import {
    CalendarCheck,
    Car,
    SquareParking,
    Users,
    type LucideIcon,
} from 'lucide-react';

export type Tab =
    | 'dashboard'
    | 'customers'
    | 'reservations';

interface SidebarProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

interface NavItem {
    id: Tab;
    label: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    {
        id: 'dashboard',
        label: 'Overview',
        icon: SquareParking,
    },
    {
        id: 'customers',
        label: 'Customers',
        icon: Users,
    },
    {
        id: 'reservations',
        label: 'Reservations',
        icon: CalendarCheck,
    },
];

export default function Sidebar({
                                    activeTab,
                                    onTabChange,
                                }: SidebarProps) {
    return (
        <aside>
            <div className="brand">
        <span>
          <Car />
        </span>

                <div>
                    ParkFlow
                    <small>Management</small>
                </div>
            </div>

            <nav>
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        type="button"
                        className={activeTab === id ? 'active' : ''}
                        onClick={() => onTabChange(id)}
                    >
                        <Icon size={19} />
                        {label}
                    </button>
                ))}
            </nav>

            <div className="aside-foot">
                Parking facility
                <br />
                <strong>12 spaces · 24/7</strong>
            </div>
        </aside>
    );
}