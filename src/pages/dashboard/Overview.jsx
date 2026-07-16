import { Users, Activity, TrendingUp } from 'lucide-react';
import { Card } from '@components/ui/Card';
import { Seo } from '@components/common/Seo';
import { useAuth } from '@hooks/useAuth';

const STATS = [
  { label: 'Total Users', value: '1,204', icon: Users },
  { label: 'Active Sessions', value: '86', icon: Activity },
  { label: 'Growth', value: '+12.4%', icon: TrendingUp },
];

export default function Overview() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <Seo title="Dashboard" noIndex />
      <div>
        <h1 className="text-2xl font-bold">Welcome{user?.name ? `, ${user.name}` : ''} 👋</h1>
        <p className="text-base-content/60 mt-1">Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary rounded-xl p-3">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-base-content/60 text-sm">{label}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-2 font-semibold">Next steps</h2>
        <ul className="text-base-content/70 list-inside list-disc space-y-1 text-sm">
          <li>Connect this dashboard to your real API in `src/services`</li>
          <li>Replace these placeholder stats with live data via `useFetch`</li>
          <li>Add role-based access checks in `ProtectedRoute` if needed</li>
        </ul>
      </Card>
    </div>
  );
}
