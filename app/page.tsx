"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RxDatabase } from "rxdb";
import { Subscription } from "rxjs";

import { SideBar } from "@/components/SideBar";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";
import { MAIN_API } from "@/utils/constants";
import { makeRxDB } from "@/utils/createDB";
import { MainList } from "@/components/MainList";
import { EditNoteForm } from "@/components/EditNoteForm";

export default function Home() {
  const [activeNote, setActiveNote] = useState<null | Note>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [db, setDb] = useState<RxDatabase | null>(null);

  useEffect(() => {
    let subscription: Subscription;

    async function setupDB() {
      const database = await makeRxDB();

      setDb(database);

      subscription = await database.notes.find().$.subscribe((tmpNotes) => {
        if (!tmpNotes.length) {
          getPosts(database);

          return;
        }

        setNotes(tmpNotes.map((note) => note.toJSON()));
      });
    }

    setupDB();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  async function getPosts(db: RxDatabase) {
    try {
      const res = await axios.get(`${MAIN_API}/posts?userId=1&userId=2`);

      notesService.addMany(db, res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-svh w-full flex-col">
      <SideBar notes={notes} onSetActiveNote={setActiveNote} />

      {!activeNote && (
        <MainList notes={notes} onSetActiveNote={setActiveNote} />
      )}

      {activeNote && db && (
        <EditNoteForm
          key={activeNote.id}
          db={db}
          notes={notes}
          activeNote={activeNote}
          onSetActiveNote={setActiveNote}
        />
      )}
    </div>
  );
}
