import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui/Card";
import { BreakdownEditor } from "./BreakdownEditor";

export default async function BreakdownDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: breakdown } = await supabase
    .from("breakdowns")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!breakdown) notFound();

  const { data: equipment } = breakdown.equipment_id
    ? await supabase.from("equipment").select("tag_number, name").eq("id", breakdown.equipment_id).single()
    : { data: null };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{breakdown.fault_description}</h1>
          {equipment && (
            <p className="text-sm text-gray-500">
              {equipment.tag_number} — {equipment.name}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Badge tone={breakdown.priority === "critical" ? "red" : breakdown.priority === "high" ? "amber" : "gray"}>
            {breakdown.priority}
          </Badge>
          <Badge tone="blue">{breakdown.status}</Badge>
        </div>
      </div>

      <Card>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Alarm / Error Code</dt>
            <dd>{breakdown.alarm_code ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Location</dt>
            <dd>{breakdown.location ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Reported</dt>
            <dd>{new Date(breakdown.start_time).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Downtime</dt>
            <dd>{breakdown.downtime_minutes != null ? `${breakdown.downtime_minutes} min` : "In progress"}</dd>
          </div>
        </dl>
      </Card>

      <BreakdownEditor breakdown={breakdown} />
    </div>
  );
}
