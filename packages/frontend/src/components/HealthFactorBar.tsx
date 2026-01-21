import { getHealthFactorColor, getHealthFactorLabel } from "../utils/healthFactor";

interface Props {
  healthFactor: number;
}

export function HealthFactorBar({ healthFactor }: Props) {
  const clampedHF = Math.min(Math.max(healthFactor, 0), 2);
  const percent = (clampedHF / 2) * 100;

  const colorClass = getHealthFactorColor(healthFactor);
  const label = getHealthFactorLabel(healthFactor);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-400">Health Factor</span>
        <span className={`font-semibold ${colorClass}`}>
          {healthFactor.toFixed(2)} · {label}
        </span>
      </div>

      <div className="w-full h-2 rounded bg-zinc-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <HealthFactorWarning healthFactor={healthFactor} />
    </div>
  );
}


function HealthFactorWarning({ healthFactor }: { healthFactor: number }) {
  if (healthFactor > 1.5) return null;

  if (healthFactor >= 1.2) {
    return (
      <p className="text-yellow-400 text-xs">
        Borrowing more will increase liquidation risk.
      </p>
    );
  }

  return (
    <p className="text-red-500 text-xs font-medium">
      ⚠️ High risk of liquidation. Borrowing is unsafe.
    </p>
  );
}
