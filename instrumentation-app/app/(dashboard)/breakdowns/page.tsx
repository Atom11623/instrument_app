import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function BreakdownsPage() {
  const supabase = createClient();
  const { data: breakdowns } = await supabase
    .from("breakdowns")
    .select("id, fault_description, priority, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Breakdowns</h1>
          <p className="text-sm text-gray-500">All reported instrumentation faults</p>
        </div>
        <Link href="/breakdowns/new">
          <Button>Report Breakdown</Button>
        </Link>
      </div>

      <Card className="p-0">
        {!breakdowns || breakdowns.length === 0 ? (
          <p className="p-6 text-center text-sm text-gray-400">No breakdowns yet. Report the first one.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs uppercase text-gray-400">
                <th className="p-3">Description</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reported</th>
              </tr>
            </thead>
            <tbody>
              {breakdowns.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-3">
                    <Link href={`/breakdowns/${b.id}`} className="hover:underline">
                      {b.fault_description}
                    </Link>
                  </td>
                  <td className="p-3">
                    <Badge tone={b.priority === "critical" ? "red" : b.priority === "high" ? "amber" : "gray"}>
                      {b.priority}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge tone="blue">{b.status}</Badge>
                  </td>
                  <td className="p-3 text-gray-500">{new Date(b.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
