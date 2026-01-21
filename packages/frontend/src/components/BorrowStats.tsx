import { getHealthFactorColor, getHealthFactorLabel } from "../utils/healthFactor";

interface Props {
  collateralUsd: number;
  debtUsd: number;
  availableBorrowUsd: number;
  healthFactor: number;
}

export function BorrowStats({
  collateralUsd,
  debtUsd,
  availableBorrowUsd,
  healthFactor,
}: Props) {
  const color = getHealthFactorColor(healthFactor);
  const label = getHealthFactorLabel(healthFactor);

  return (
    <div className="rounded-xl border p-4 space-y-2 bg-zinc-900">
      <Stat label="Collateral Value" value={`$${collateralUsd.toFixed(2)}`} />
      <Stat label="Total Debt" value={`$${debtUsd.toFixed(2)}`} />
      <Stat label="Available Borrow" value={`$${availableBorrowUsd.toFixed(2)}`} />

      <div className="flex justify-between items-center pt-2 border-t border-zinc-700">
        <span className="text-sm text-zinc-400">Health Factor</span>
        <span className={`font-semibold ${color}`}>
          {healthFactor.toFixed(2)} · {label}
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-zinc-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
