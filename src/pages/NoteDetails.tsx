import { redirect, useLoaderData, type LoaderFunctionArgs, useNavigate } from "react-router";
import { getNote, updateNote, deleteNote } from "../utils/storage";
import type { Note } from "../types";
import { useEffect, useState } from "react";

export const noteDetailLoader = ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw redirect("/");

  const note = getNote(params.id);
  if (!note) throw redirect("/");

  return note;
};

function NoteDetails() {
  const initialNote = useLoaderData() as Note;
  const [note, setNote] = useState(initialNote);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `CardNotes |  ${note.title}`;

    //cleanup function to reset title when component unmounts
    return () => {
      document.title = "CardNotes.";
    };
  }, [note.title]);

  const handleSave = () => {
    const updatedNote = updateNote(note.id, { title: editedTitle, content: editedContent });
    if (updatedNote) {
      setNote(updatedNote);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (deleteNote(note.id)) {
      navigate("/");
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className="space-y-4">

      <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:underline dark:text-zinc-400">
        &larr; Back to Dashboard
      </button>


      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-3xl font-bold w-full border rounded p-2"
        />
      ) : (
        <h1 className="text-3xl font-bold">{note.title}</h1>
      )}
      <p className="text-sm text-zinc-500">
        Created : {new Date(note.createdAt).toLocaleDateString()}
      </p>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-xl leading-relaxed whitespace-pre-wrap w-full border rounded min-h-[200px]"
        />
      ) : (
        <p className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-xl leading-relaxed whitespace-pre-wrap">
          {note.content}
        </p>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="px-4 py-2 w-24 bg-zinc-500 text-white rounded-2xl hover:bg-zinc-300 ">
              Save
            </button>
            <button onClick={handleCancel} className="px-4 py-2 bg-zinc-500 text-white rounded-2xl hover:bg-zinc-300 ">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 w-24 bg-zinc-500 dark:bg-zinc-600 dark:text-zinc-100 text-white rounded-2xl hover:bg-zinc-700 dark:hover:bg-zinc-200 transition">
              Edit
            </button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600">
              Delete
            </button>
          </>
        )}
      </div>
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this note?</p>
            <div className="flex gap-2 justify-end">
              <button onClick={handleCancelDelete} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteDetails;
