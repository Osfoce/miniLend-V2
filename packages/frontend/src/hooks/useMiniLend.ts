import { useReadContract } from 'wagmi'
import MiniLendABI from '../abi/MiniLend.json'

const MINI_LEND_ADDRESS = '0xYourMiniLendAddress'

export function useMiniLend(address?: `0x${string}`) {
  const collateral = useReadContract({
    address: MINI_LEND_ADDRESS,
    abi: MiniLendABI,
    functionName: 'getUserCollateral',
    args: address ? [address] : undefined,
  })

  const debt = useReadContract({
    address: MINI_LEND_ADDRESS,
    abi: MiniLendABI,
    functionName: 'getUserDebt',
    args: address ? [address] : undefined,
  })

  const liquidationThreshold = useReadContract({
    address: MINI_LEND_ADDRESS,
    abi: MiniLendABI,
    functionName: 'LIQUIDATION_THRESHOLD',
  })

  return { collateral, debt, liquidationThreshold }
}