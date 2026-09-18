import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";

export default async function HandoverPage() {
  const supabase = createClient();
  const { data: handovers } = await supabase
    .from("shift_handovers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Shift Handover</h1>
        <p className="text-sm text-gray-500">Outstanding items passed between shifts</p>
      </div>

      <Card>
        <p className="text-sm text-gray-500">
          This module is scaffolded (table + RLS in place). Next build step: a handover form (outstanding
          breakdowns, equipment under observation, temp repairs, safety concerns, bypassed instruments) mirroring
          the pattern used in <code>breakdowns/new</code>.
        </p>
      </Card>

      {handovers && handovers.length > 0 && (
        <Card>
          <h2 className="mb-2 text-sm font-semibold">Recent Handovers</h2>
          <ul className="space-y-2 text-sm">
            {handovers.map((h) => (
              <li key={h.id} className="border-b border-gray-50 pb-2">
                {h.shift_date} — {h.shift_type}: {h.notes ?? "No notes"}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
