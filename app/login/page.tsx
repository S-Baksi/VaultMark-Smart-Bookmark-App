"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-dark">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          VaultMark
        </h1>
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
