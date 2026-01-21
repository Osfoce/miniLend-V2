export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  )
}