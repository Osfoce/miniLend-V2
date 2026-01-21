import { useAccount } from 'wagmi'
import { useHealthFactor } from '../hooks/useHealthFactor'
import { StatCard } from './StatCard'

export function Dashboard() {
  const { address } = useAccount()
  const stats = useHealthFactor(address)

  if (!stats) return <p>Loading…</p>

  const riskColor = stats.healthFactor < 1.1
    ? 'text-red-500'
    : stats.healthFactor < 1.5
    ? 'text-yellow-500'
    : 'text-green-500'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard label="Collateral (USD)" value={`$${stats.collateralUsd.toFixed(2)}`} />
      <StatCard label="Debt (USD)" value={`$${stats.debtUsd.toFixed(2)}`} />
      <StatCard label="Available Borrow" value={`$${stats.availableBorrowUsd.toFixed(2)}`} />
      <div className={`text-2xl font-bold ${riskColor}`}>
        Health Factor: {stats.healthFactor.toFixed(2)}
      </div>
    </div>
  )
}