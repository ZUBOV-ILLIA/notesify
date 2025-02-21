import { useState } from "react";
import { RxDatabase } from "rxdb";
import { v4 as uuidv4 } from "uuid";

import { Note } from "@/types/note";
import { notesService } from "@/services/notes.service";

type Props = {
  db: RxDatabase;
  notes: Note[];
  activeNote: Note;
  onSetActiveNote: (obj: Note | null) => void;
};

export function EditNoteForm({
  db,
  notes,
  activeNote,
  onSetActiveNote,
}: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      setTitle(`New - ${day}.${month}.${year}_${hours}:${minutes}`);
    }

    // handleAddOneNote();
  }

  function handleCancel() {
    setTitle("");
    setBody("");
    onSetActiveNote(null);
  }

  function handleAddOneNote() {
    if (!db) return;

    notesService.addOne(db, {
      id: uuidv4(),
      title,
      body,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="py-2 flex flex-col flex-1">
      <textarea
        placeholder="Title"
        className="p-2 text-2xl text-white bg-black outline-none resize-none"
        value={title || activeNote.title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note"
        className="p-2 flex-1 text-xl text-white bg-black outline-none resize-none"
        value={body || activeNote.body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="fixed top-0 right-0 py-2.5 px-2 flex justify-between gap-3 bg-black">
        <button
          className="py-1 px-2 rounded-md border bg-red-600"
          onClick={handleCancel}
        >
          CANCEL
        </button>

        <button
          type="submit"
          className="py-1 px-2 rounded-md border bg-green-500"
        >
          SAVE
        </button>
      </div>
    </form>
  );
}
