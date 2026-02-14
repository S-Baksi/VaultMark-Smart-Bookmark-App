import { Bookmark } from "@/types/bookmark";

export default function BookmarkCard({
  bookmark,
  onDelete,
}: {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-start">
      <div>
        <a
          href={bookmark.url}
          target="_blank"
          className="text-primary font-semibold"
        >
          {bookmark.title}
        </a>
        <p className="text-sm text-gray-500 mt-1">
          {bookmark.description}
        </p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {bookmark.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => onDelete(bookmark.id)}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
