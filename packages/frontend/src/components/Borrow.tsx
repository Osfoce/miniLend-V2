import { useState } from 'react'
import { parseEther } from 'viem'
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import MiniLendABI from '../abi/MiniLend.json'
import { useHealthFactor } from '../hooks/useHealthFactor'
import { BorrowConfirmModal } from '../components/BorrowConfirmModal'

const MINI_LEND_ADDRESS = '0xYourMiniLendAddress'
const BORROW_TOKEN = '0xYourBorrowTokenAddress'

export function Borrow() {
  const { address } = useAccount()
  const stats = useHealthFactor(address)

  const [amountUsd, setAmountUsd] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } =
    useWaitForTransactionReceipt({ hash })

  if (!stats || stats.availableBorrowUsd <= 0) {
    return (
      <p className="text-sm text-gray-500">
        No borrowing power available
      </p>
    )
  }

  const maxUsd = Math.max(0, stats.availableBorrowUsd)

  // -------- Core borrow write --------
  const borrow = () => {
    writeContract({
      address: MINI_LEND_ADDRESS,
      abi: MiniLendABI,
      functionName: 'borrowAsset',
      args: [BORROW_TOKEN, parseEther(String(amountUsd))],
    })
  }

  // -------- Post-borrow simulations (frontend-only) --------
  const debtAfterBorrowUsd = stats.debtUsd + amountUsd

  const healthFactorAfter =
    debtAfterBorrowUsd === 0
      ? Infinity
      : (stats.collateralUsd * stats.liquidationThreshold) /
        debtAfterBorrowUsd

  return (
    <div className="p-4 border rounded-lg max-w-md">
      <h3 className="font-semibold mb-2">Borrow</h3>

      <input
        type="range"
        min={0}
        max={maxUsd}
        step={1}
        value={amountUsd}
        onChange={(e) => setAmountUsd(Number(e.target.value))}
        className="w-full mb-2"
      />

      <div className="text-sm mb-3">
        Borrowing:{' '}
        <strong>${amountUsd.toFixed(2)}</strong> / $
        {maxUsd.toFixed(2)}
      </div>

      {/* Borrow button now opens modal */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={amountUsd === 0 || isPending || isConfirming}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        Borrow
      </button>

      {/* Confirmation Modal */}
      <BorrowConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false)
          borrow()
        }}
        borrowUsd={amountUsd}
        debtAfterBorrowUsd={debtAfterBorrowUsd}
        healthFactor={healthFactorAfter}
      />
    </div>
  )
}
