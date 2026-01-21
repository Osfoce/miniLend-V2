export function getHealthFactorColor(hf: number) {
  if (hf > 1.5) return "text-green-500";
  if (hf >= 1.2) return "text-yellow-500";
  return "text-red-500";
}

export function getHealthFactorLabel(hf: number) {
  if (hf > 1.5) return "Safe";
  if (hf >= 1.2) return "Caution";
  return "Liquidation Risk";
}
