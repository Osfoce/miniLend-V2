// ============================
// src/pages/Dashboard.tsx
// Final MiniLend Dashboard Layout
// ============================

import { StakeEth } from "../components/StakeEth";
import { Borrow } from "../components/Borrow";
import { BorrowStats } from "../components/BorrowStats";
import { HealthFactorBar } from "../components/HealthFactorBar";
import { RepayBorrow } from "../components/RepayBorrow";
import { WithdrawCollateral } from "../components/WithdrawCollateral";


export default function Dashboard() {
  // These values normally come from hooks (wagmi + viem reads)
  const collateralUsd = 1200;
  const debtUsd = 400;
  const availableBorrowUsd = 300;
  const healthFactor = 1.6;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">MiniLend Dashboard</h1>
          <p className="text-sm text-zinc-400">
            Stake ETH, borrow stable assets, and manage liquidation risk.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <StakeEth />
            <Borrow />
          </div>

          {/* MIDDLE COLUMN */}
          <div className="space-y-6">
            <BorrowStats
              collateralUsd={collateralUsd}
              debtUsd={debtUsd}
              availableBorrowUsd={availableBorrowUsd}
              healthFactor={healthFactor}
            />

            <HealthFactorBar healthFactor={healthFactor} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <RepayBorrow debtUsd={debtUsd} maxRepayUsd={debtUsd} />
            <WithdrawCollateral
              collateralEth={0.8}
              maxWithdrawEth={0.3}
              healthFactorAfter={healthFactor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================
// UX Principles Applied
// - Left: Actions (Stake / Borrow)
// - Middle: Risk & Metrics
// - Right: Position Management
// ============================
