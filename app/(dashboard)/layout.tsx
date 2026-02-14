"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          VaultMark
        </h2>
        <nav className="space-y-3 text-gray-700">
          <p className="cursor-pointer hover:text-blue-600">
            Dashboard
          </p>
          <p className="cursor-pointer hover:text-blue-600">
            Categories
          </p>
          <p className="cursor-pointer hover:text-blue-600">
            Settings
          </p>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Smart Bookmark Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
