import Dexie, { type Table } from "dexie";
import type { Note } from "../model/types";

class NotesDB extends Dexie {
  notes!: Table<Note, string>;

  constructor() {
    super("notes_app_db");

    this.version(1).stores({
      notes: "id, updatedAt",
    });
  }
}

export const notesDb = new NotesDB();

export async function getAllNotes(): Promise<Note[]> {
  return notesDb.notes.toArray();
}

export async function upsertNote(note: Note): Promise<void> {
  await notesDb.notes.put(note);
}

export async function deleteNoteById(id: string): Promise<void> {
  await notesDb.notes.delete(id);
}

export async function countNotes(): Promise<number> {
  return notesDb.notes.count();
}

export async function bulkUpsertNotes(notes: Note[]): Promise<void> {
  await notesDb.notes.bulkPut(notes);
}
