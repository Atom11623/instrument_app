import { createClient } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui/Card";

export default async function AdminUsersPage() {
  const supabase = createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, active")
    .order("full_name");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">User Management</h1>
        <p className="text-sm text-gray-500">Admin-only: staff accounts and roles</p>
      </div>

      <Card className="p-0">
        {!profiles || profiles.length === 0 ? (
          <p className="p-6 text-center text-sm text-gray-400">No users yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs uppercase text-gray-400">
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="border-b border-gray-50">
                  <td className="p-3">{p.full_name}</td>
                  <td className="p-3">
                    <Badge tone="blue">{p.role}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge tone={p.active ? "green" : "gray"}>{p.active ? "Active" : "Inactive"}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card>
        <p className="text-sm text-gray-500">
          New staff sign up at <code>/login</code>'s underlying Supabase Auth (invite via Supabase dashboard →
          Authentication → Users → Invite), then get a <code>profiles</code> row automatically via the
          <code> handle_new_user</code> trigger, defaulting to the technician role. Promote them to
          engineer/admin here — next build step: a role-change dropdown wired to an update call, restricted to
          admins by RLS (already enforced at the DB level).
        </p>
      </Card>
    </div>
  );
}
