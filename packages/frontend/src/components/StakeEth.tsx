import { useState } from 'react'
import { parseEther } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import MiniLendABI from '../abi/MiniLend.json'

const MINI_LEND_ADDRESS = '0xYourMiniLendAddress'

export function StakeEth() {
  const [amount, setAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const stake = () => {
    if (!amount) return

    writeContract({
      address: MINI_LEND_ADDRESS,
      abi: MiniLendABI,
      functionName: 'stakeEth',
      value: parseEther(amount),
    })
  }

  return (
    <div className="p-4 border rounded-lg max-w-md">
      <h3 className="font-semibold mb-2">Stake ETH</h3>

      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3"
      />

      <button
        onClick={stake}
        disabled={isPending || isConfirming}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {isPending ? 'Confirm in wallet…' : isConfirming ? 'Staking…' : 'Stake ETH'}
      </button>
    </div>
  )
}