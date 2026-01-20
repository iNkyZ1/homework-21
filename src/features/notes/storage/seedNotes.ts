import { demoNotes } from "../model/demoNotes";
import { bulkUpsertNotes, countNotes } from "./notesDb";

export async function ensureSeedNotes(): Promise<void> {
  const count = await countNotes();
  if (count === 0) {
    await bulkUpsertNotes(demoNotes);
  }
}
