import { getHealthFactorColor, getHealthFactorLabel } from "../utils/healthFactor";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  borrowUsd: number;
  debtAfterBorrowUsd: number;
  healthFactor: number;
}

export function BorrowConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  borrowUsd,
  debtAfterBorrowUsd,
  healthFactor,
}: Props) {
  if (!isOpen) return null;

  const color = getHealthFactorColor(healthFactor);
  const label = getHealthFactorLabel(healthFactor);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold">Confirm Borrow</h2>

        <Stat label="Borrow Amount" value={`$${borrowUsd.toFixed(2)}`} />
        <Stat label="Total Debt After" value={`$${debtAfterBorrowUsd.toFixed(2)}`} />

        <div className="border-t border-zinc-700 pt-3">
          <div className="flex justify-between">
            <span className="text-sm text-zinc-400">Health Factor</span>
            <span className={`font-semibold ${color}`}>
              {healthFactor.toFixed(2)} · {label}
            </span>
          </div>

          <RiskText healthFactor={healthFactor} />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-700 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium"
          >
            Confirm Borrow
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-zinc-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function RiskText({ healthFactor }: { healthFactor: number }) {
  if (healthFactor > 1.5) return null;

  if (healthFactor >= 1.2) {
    return (
      <p className="text-yellow-400 text-xs mt-2">
        Borrowing more increases liquidation risk.
      </p>
    );
  }

  return (
    <p className="text-red-500 text-xs font-medium mt-2">
      ⚠️ This position is close to liquidation.
    </p>
  );
}
