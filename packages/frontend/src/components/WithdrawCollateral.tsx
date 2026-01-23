import { useState } from 'react'
import { parseEther } from 'viem'
import {useWriteContract} from 'wagmi'

interface WithdrawProps {
collateralEth: number;
maxWithdrawEth: number;
healthFactorAfter: number;
}


export function WithdrawCollateral({
collateralEth,
maxWithdrawEth,
healthFactorAfter,
}: WithdrawProps) {
const [withdrawEth, setWithdrawEth] = useState(0);
const { writeContract, isPending } = useWriteContract();


const withdraw = () => {
writeContract({
address: "0xMiniLend",
abi: [], // MiniLend ABI
functionName: "withdraw",
args: [parseEther(withdrawEth.toString())],
});
};


const unsafe = healthFactorAfter < 1.2;


return (
<div className="rounded-xl border p-4 space-y-3 bg-zinc-900">
<h3 className="font-semibold">Withdraw ETH</h3>


<input
type="range"
min={0}
max={maxWithdrawEth}
step={0.01}
value={withdrawEth}
onChange={(e) => setWithdrawEth(Number(e.target.value))}
/>


<div className="flex justify-between text-sm">
<span>Withdraw</span>
<span>{withdrawEth.toFixed(4)} ETH</span>
</div>


{unsafe && (
<p className="text-red-500 text-xs">
⚠️ Withdrawal would put position at liquidation risk
</p>
)}


<button
disabled={withdrawEth === 0 || unsafe || isPending}
onClick={withdraw}
className="w-full rounded-lg bg-orange-500 py-2 text-sm font-medium disabled:opacity-50"
>
{isPending ? "Withdrawing..." : "Withdraw"}
</button>
</div>
);
}