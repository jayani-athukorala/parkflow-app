import type { LucideIcon } from 'lucide-react';

interface MetricProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
}

export default function Metric({
                                   label,
                                   value,
                                   icon: Icon,
                               }: MetricProps) {
    return (
        <div className="metric">
      <span>
        <Icon size={20} />
      </span>

            <div>
                <p>{label}</p>
                <strong>{value}</strong>
            </div>
        </div>
    );
}