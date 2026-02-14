"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ user, onAdded }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    if (!error) {
      setTitle("");
      setUrl("");
      onAdded?.(); // 🔥 instant refresh same tab
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow flex gap-3">
      <input
        className="border p-3 flex-1 rounded-lg"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-3 flex-1 rounded-lg"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={addBookmark}
        className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
  );
}
