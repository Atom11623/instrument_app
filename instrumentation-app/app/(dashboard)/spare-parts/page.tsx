import { createClient } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui/Card";

export default async function SparePartsPage() {
  const supabase = createClient();
  const { data: parts } = await supabase
    .from("spare_parts")
    .select("id, part_number, name, stock_qty, min_stock_qty")
    .order("part_number");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Spare Parts</h1>
        <p className="text-sm text-gray-500">Inventory levels and low-stock alerts</p>
      </div>

      <Card className="p-0">
        {!parts || parts.length === 0 ? (
          <p className="p-6 text-center text-sm text-gray-400">
            No spare parts registered yet. A create-part form is the next build step here.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs uppercase text-gray-400">
                <th className="p-3">Part #</th>
                <th className="p-3">Name</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => {
                const low = p.stock_qty <= p.min_stock_qty;
                return (
                  <tr key={p.id} className="border-b border-gray-50">
                    <td className="p-3">{p.part_number}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.stock_qty}</td>
                    <td className="p-3">
                      <Badge tone={low ? "red" : "green"}>{low ? "Low stock" : "OK"}</Badge>
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
