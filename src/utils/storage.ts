import type { Note } from "../types";

const STORAGE_KEY = "cardnotes_data";

export const getNotes = (): Note[] => {
  const notes = localStorage.getItem(STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};

export const getNote = (id: string): Note | null => {
  const notes = getNotes();
  return notes.find((note) => note.id === id) || null;
};

export const saveNote = (note: Omit<Note, "id" | "createdAt">): Note => {
  const notes = getNotes();
  const newNote: Note = {
    ...note,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes, newNote]));
  return newNote;
};

export const updateNote = (id: string, updates: Partial<Omit<Note, "id" | "createdAt">>): Note | null => {
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === id);
  if (index === -1) return null;
  notes[index] = { ...notes[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return notes[index];
};

export const deleteNote = (id: string): boolean => {
  const notes = getNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  if (filteredNotes.length === notes.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
  return true;
};
