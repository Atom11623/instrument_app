"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/breakdowns", label: "Breakdowns" },
  { href: "/handover", label: "Shift Handover" },
  { href: "/equipment", label: "Equipment" },
  { href: "/pm-calibration", label: "PM & Calibration" },
  { href: "/spare-parts", label: "Spare Parts" },
  { href: "/reports", label: "Reports" },
  { href: "/ai-assistant", label: "AI Assistant" },
  { href: "/admin/users", label: "Admin: Users" },
];

export function Sidebar({ userName, role }: { userName: string; role: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <p className="text-sm font-semibold text-brand-700">Instrumentation O&M</p>
        <p className="mt-1 text-xs text-gray-500">
          {userName} · {role}
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "block rounded-md px-3 py-2 text-sm font-medium",
              pathname === item.href
                ? "bg-brand-50 text-brand-700"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          onClick={handleLogout}
          className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
