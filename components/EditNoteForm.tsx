import { useState } from "react";
import { RxDatabase } from "rxdb";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

import { Note } from "@/types/note";
import { notesService } from "@/services/notes.service";
import { DeleteModal } from "./DeleteModal";

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
  const [title, setTitle] = useState(activeNote.title);
  const [body, setBody] = useState(activeNote.body);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const date = new Date();

    const note = {
      id: activeNote.id === "new" ? uuidv4() : activeNote.id,
      title,
      body,
      updated: new Date().valueOf(),
    };

    if (!title.trim()) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      note.title = `New - ${day}.${month}.${year}_${hours}:${minutes}`;
    }

    if (activeNote.id === "new") {
      notesService.addOne(db, note);
    } else {
      notesService.updateOne(db, note);
    }

    onSetActiveNote(null);
  }

  function handleCancel() {
    onSetActiveNote(null);
  }

  function handleDeleteNote() {
    notesService.deleteOne(db, activeNote.id);
    onSetActiveNote(null);
  }

  return (
    <form onSubmit={handleSubmit} className="py-2 flex flex-col flex-1">
      <textarea
        placeholder="Title"
        className="p-2 text-2xl text-white bg-black outline-none resize-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note"
        className="p-2 flex-1 text-xl text-white bg-black outline-none resize-none"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="absolute top-0 right-0 py-2.5 px-2 flex justify-between gap-3 bg-black">
        {activeNote.id !== "new" && (
          <div
            className="h-8 w-8 flex items-center justify-center cursor-pointer"
            onClick={() => setShowDeleteModal(true)}
          >
            <Image
              src="/trash.svg"
              alt="trash_icon"
              className=""
              width={24}
              height={24}
              priority
            />
          </div>
        )}

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

      {showDeleteModal && (
        <DeleteModal
          onDelete={handleDeleteNote}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </form>
  );
}
