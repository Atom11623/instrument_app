import { Card } from "@/components/ui/Card";

export default function ReportsPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Reports</h1>
        <p className="text-sm text-gray-500">Daily, shift, weekly, and breakdown reports</p>
      </div>
      <Card>
        <p className="text-sm text-gray-500">
          Not yet built. Recommended approach: a server route (<code>/api/reports/generate</code>) that queries
          Supabase for the selected date range and status, then renders a PDF with{" "}
          <code>@react-pdf/renderer</code> (free) and offers CSV export via a simple client-side download.
        </p>
      </Card>
    </div>
  );
}
