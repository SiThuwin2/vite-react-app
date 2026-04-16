import { Link, useLoaderData } from "react-router";
import { getNotes } from "../utils/storage";
import type { Note } from "../types";
import { useState } from "react";

export const dashboardLoader = () => {
  return getNotes();
};

function Dashboard() {
  const notes = useLoaderData() as Note[];
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="search notes..."
        className="w-full p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <Link
            to={`/note/${note.id}`}
            key={note.id}
            className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
            <p className=" text-zinc-500 dark:text-zinc-400 line-clamp-3">
              {note.content}
            </p>
          </Link>
        ))}
        {filteredNotes.length === 0 && (
          <p className="text-zinc-500">No notes found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
