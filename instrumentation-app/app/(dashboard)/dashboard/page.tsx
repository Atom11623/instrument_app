import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, Badge } from "@/components/ui/Card";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: breakdowns } = await supabase
    .from("breakdowns")
    .select("id, fault_description, priority, status, created_at, equipment_id")
    .order("created_at", { ascending: false })
    .limit(8);

  const active = (breakdowns ?? []).filter((b) => b.status !== "closed");
  const critical = active.filter((b) => b.priority === "critical");
  const completed = (breakdowns ?? []).filter((b) => b.status === "closed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Department Dashboard</h1>
        <p className="text-sm text-gray-500">Live overview of instrumentation department activity</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Active Breakdowns" value={active.length} />
        <StatCard label="Critical Faults" value={critical.length} tone={critical.length > 0 ? "critical" : "default"} />
        <StatCard label="Completed (recent)" value={completed.length} />
        <StatCard label="Total Logged" value={breakdowns?.length ?? 0} />
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent Breakdowns</h2>
          <Link href="/breakdowns" className="text-sm text-brand-600 hover:underline">
            View all
          </Link>
        </div>

        {!breakdowns || breakdowns.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">No breakdowns logged yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-400">
                <th className="pb-2">Description</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {breakdowns.map((b) => (
                <tr key={b.id} className="border-b border-gray-50">
                  <td className="py-2">
                    <Link href={`/breakdowns/${b.id}`} className="hover:underline">
                      {b.fault_description}
                    </Link>
                  </td>
                  <td className="py-2">
                    <Badge tone={b.priority === "critical" ? "red" : b.priority === "high" ? "amber" : "gray"}>
                      {b.priority}
                    </Badge>
                  </td>
                  <td className="py-2">
                    <Badge tone="blue">{b.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
