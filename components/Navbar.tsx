"use client";

import { supabase } from "@/lib/supabaseClient";

type NavbarProps = {
  email: string;
};

export default function Navbar({ email }: NavbarProps) {

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
      <h1 className="text-xl font-bold">VaultMark</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{email}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
