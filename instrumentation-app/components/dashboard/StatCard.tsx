import { Card } from "@/components/ui/Card";

export function StatCard({ label, value, tone = "default" }: { label: string; value: string | number; tone?: "default" | "critical" }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${tone === "critical" ? "text-red-600" : "text-gray-900"}`}>
        {value}
      </p>
    </Card>
  );
}
