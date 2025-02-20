import { Note } from "@/types/note";
import { RxDatabase } from "rxdb";

async function addOne(db: RxDatabase, { id, title, body }: Note) {
  const res = await db.notes.insert({ id, title, body });
}

async function addMany(db: RxDatabase, notes: Note[]) {
  const prep = notes.map((note) => ({
    id: note.id.toString(),
    title: note.title,
    body: note.body,
  }));

  await db.notes.bulkInsert(prep);
}

export const notesService = {
  addOne,
  addMany,
};
