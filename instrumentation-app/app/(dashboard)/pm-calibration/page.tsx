import { createClient } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui/Card";

export default async function PMCalibrationPage() {
  const supabase = createClient();
  const { data: pmSchedules } = await supabase
    .from("pm_schedules")
    .select("id, task_name, next_due, equipment_id")
    .order("next_due");

  const today = new Date();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Preventive Maintenance & Calibration</h1>
        <p className="text-sm text-gray-500">Schedules, due dates, and overdue items</p>
      </div>

      <Card className="p-0">
        {!pmSchedules || pmSchedules.length === 0 ? (
          <p className="p-6 text-center text-sm text-gray-400">
            No PM schedules yet. Insert rows into <code>pm_schedules</code> (linked to equipment) to populate this
            view — a create form is the next build step here.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs uppercase text-gray-400">
                <th className="p-3">Task</th>
                <th className="p-3">Next Due</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pmSchedules.map((pm) => {
                const overdue = new Date(pm.next_due) < today;
                return (
                  <tr key={pm.id} className="border-b border-gray-50">
                    <td className="p-3">{pm.task_name}</td>
                    <td className="p-3">{pm.next_due}</td>
                    <td className="p-3">
                      <Badge tone={overdue ? "red" : "green"}>{overdue ? "Overdue" : "On schedule"}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
