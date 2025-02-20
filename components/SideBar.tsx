"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RxDatabase } from "rxdb";

import { makeRxDB } from "@/utils/createDB";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";

export function SideBar() {
  const [isOpened, setIsOpened] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [db, setDb] = useState<RxDatabase | null>(null);

  useEffect(() => {
    let subscription: any;

    async function setupDB() {
      const database = await makeRxDB();

      setDb(database);

      subscription = await database.notes.find().$.subscribe((tmpNotes) => {
        console.log(">>>>", tmpNotes);

        if (!tmpNotes.length) {
          getPosts(database);

          return;
        }

        setNotes(tmpNotes.map((note) => note.toJSON()));
      });
    }

    setupDB();

    // getPosts();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  async function getPosts(db: RxDatabase) {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?userId=1"
    );

    notesService.addMany(db, res.data);
  }

  return (
    <>
      <div
        className="fixed m-2  p-2 flex items-center justify-center border rounded-full bg-slate-600 cursor-pointer"
        onClick={() => setIsOpened(true)}
      >
        <span className="font-bold">See all notes</span>
      </div>

      <div
        className={`fixed top-0 bottom-0 min-h-svh ${
          isOpened ? "w-80" : "w-0"
        } duration-300 bg-gray-600 overflow-x-hidden`}
      >
        <div
          className="sticky h-8 w-8 top-2 left-full mr-2 flex items-center justify-center border rounded-full font-bold bg-red-500 cursor-pointer"
          onClick={() => setIsOpened(false)}
        >
          X
        </div>

        <button
          onClick={() => {
            if (!db) return;

            notesService.addOne(db, {
              id: `todo-${Math.random()}`,
              title: "Learn RxDB",
              body: "lorem ipsum dolor sit amet ",
            });
          }}
        >
          push
        </button>

        <ul className="h-[90%] p-2 flex flex-col gap-2">
          {notes.map((note) => (
            <li key={note.id}>{note.id}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
