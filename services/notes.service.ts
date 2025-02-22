import { Note } from "@/types/note";
import { RxDatabase } from "rxdb";

async function addOne(db: RxDatabase, { id, title, body, updated }: Note) {
  await db.notes.insert({ id, title, body, updated });
}

async function addMany(db: RxDatabase, notes: Note[]) {
  const prep = notes.map((note) => ({
    id: note.id.toString(),
    title: note.title,
    body: note.body,
    updated: new Date().valueOf(),
  }));

  await db.notes.bulkInsert(prep);
}

async function updateOne(db: RxDatabase, note: Note) {
  await db.notes
    .find({
      selector: {
        id: {
          $eq: note.id,
        },
      },
    })
    .update({ $set: note });
}

async function deleteOne(db: RxDatabase, id: string) {
  await db.notes
    .find({
      selector: {
        id: {
          $eq: id,
        },
      },
    })
    .remove();
}

export const notesService = {
  addOne,
  addMany,
  updateOne,
  deleteOne,
};
