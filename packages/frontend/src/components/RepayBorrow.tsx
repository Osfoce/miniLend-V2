import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";


interface RepayProps {
debtUsd: number;
maxRepayUsd: number;
onSuccess?: () => void;
}


export function RepayBorrow({ debtUsd, maxRepayUsd, onSuccess }: RepayProps) {
const [repayUsd, setRepayUsd] = useState(0);


const { writeContract, isPending } = useWriteContract();


const repay = () => {
writeContract({
address: "0xMiniLend",
abi: [], // MiniLend ABI
functionName: "repay",
args: [parseEther(repayUsd.toString())],
});
onSuccess?.();
};


return (
<div className="rounded-xl border p-4 space-y-3 bg-zinc-900">
<h3 className="font-semibold">Repay Loan</h3>


<input
type="range"
min={0}
max={maxRepayUsd}
step={1}
value={repayUsd}
onChange={(e) => setRepayUsd(Number(e.target.value))}
/>


<div className="flex justify-between text-sm">
<span>Repay Amount</span>
<span>${repayUsd.toFixed(2)}</span>
</div>


<button
disabled={repayUsd === 0 || isPending}
onClick={repay}
className="w-full rounded-lg bg-green-600 py-2 text-sm font-medium disabled:opacity-50"
>
{isPending ? "Repaying..." : "Repay"}
</button>
</div>
);
}