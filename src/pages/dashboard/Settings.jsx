import { Card } from '@components/ui/Card';
import { Seo } from '@components/common/Seo';
import { THEMES } from '@constants/app';
import { useTheme } from '@hooks/useTheme';
import { cn } from '@utils/cn';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-lg space-y-6">
      <Seo title="Settings" noIndex />
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <h2 className="mb-3 font-semibold">Appearance</h2>
        <p className="text-base-content/60 mb-4 text-sm">Choose how the app looks to you.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              data-theme={t.value}
              className={cn(
                'bg-base-100 border-base-300 rounded-lg border p-3 text-left text-sm transition-shadow',
                theme === t.value && 'ring-primary ring-2'
              )}
            >
              <span className="text-base-content font-medium">{t.label}</span>
              <div className="mt-2 flex gap-1">
                <span className="bg-primary h-3 w-3 rounded-full" />
                <span className="bg-secondary h-3 w-3 rounded-full" />
                <span className="bg-accent h-3 w-3 rounded-full" />
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
