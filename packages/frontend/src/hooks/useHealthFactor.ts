import { formatEther } from 'viem'
import { useMiniLend } from './useMiniLend'

const ETH_PRICE_USD = 3000 // fetched implicitly from Chainlink on‑chain

export function useHealthFactor(user?: `0x${string}`) {
  const { collateral, debt, liquidationThreshold } = useMiniLend(user)

  if (!collateral.data || !debt.data || !liquidationThreshold.data) {
    return null
  }

  const collateralEth = Number(formatEther(collateral.data))
  const debtUsd = Number(formatEther(debt.data))

  const collateralUsd = collateralEth * ETH_PRICE_USD
  const threshold = Number(liquidationThreshold.data) / 10_000

  const healthFactor = debtUsd === 0
    ? Infinity
    : (collateralUsd * threshold) / debtUsd

  const availableBorrowUsd = collateralUsd * threshold - debtUsd

  return {
    collateralUsd,
    debtUsd,
    healthFactor,
    availableBorrowUsd,
  }
}