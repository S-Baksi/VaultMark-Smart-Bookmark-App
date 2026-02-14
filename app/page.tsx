"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const listRef = useRef<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <Navbar email={user.email} />

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold">
          Welcome back 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your bookmarks professionally.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search bookmarks..."
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Pass refresh handler */}
      <BookmarkForm
        user={user}
        onAdded={() => listRef.current?.refresh()}
      />

      {/* Attach ref */}
      <BookmarkList
        ref={listRef}
        user={user}
        search={search}
      />

    </div>
  );
}
