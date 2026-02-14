"use client";

import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types/bookmark";

type Props = {
  user: any;
  search?: string;
};

const BookmarkList = forwardRef<any, Props>(
  ({ user, search = "" }, ref) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setBookmarks(data);
    };

    useImperativeHandle(ref, () => ({
      refresh: fetchBookmarks,
    }));

    useEffect(() => {
      if (!user) return;

      fetchBookmarks();

      const channel = supabase
        .channel(`bookmarks-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchBookmarks();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }, [user]);

    const deleteBookmark = async (id: string) => {
      await supabase.from("bookmarks").delete().eq("id", id);
      fetchBookmarks(); // 🔥 instant update same tab
    };

    const filtered = bookmarks.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-10">
          No bookmarks found.
        </div>
      );
    }

    return (
      <div className="grid gap-4">
        {filtered.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <a
                href={bookmark.url}
                target="_blank"
                className="text-blue-600 font-semibold"
              >
                {bookmark.title}
              </a>
              <p className="text-xs text-gray-400 mt-1">
                {bookmark.url}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(bookmark.url)
                }
                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Copy
              </button>

              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default BookmarkList;
