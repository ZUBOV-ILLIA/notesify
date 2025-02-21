"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RxDatabase } from "rxdb";

import { makeRxDB } from "@/utils/createDB";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";
import { MAIN_API } from "@/utils/constants";

export function SideBar() {
  const [isOpened, setIsOpened] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [db, setDb] = useState<RxDatabase | null>(null);

  useEffect(() => {
    let subscription: any;

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
    const res = await axios.get(`${MAIN_API}/posts?userId=1`);

    notesService.addMany(db, res.data);
  }

  function handleAddOneNote() {
    if (!db) return;

    notesService.addOne(db, {
      id: `todo-${Math.random()}`,
      title: `title lorem -${Math.random()}`,
      body: `lorem ipsum dolor-${Math.random()}${Math.random()}${Math.random()}`,
    });
  }

  return (
    <>
      <div className="sticky p-2 w-full flex justify-between border-b">
        <div
          className="p-2 flex items-center justify-center bg-slate-600 cursor-pointer"
          onClick={() => setIsOpened(true)}
        >
          <span className="font-bold">See all notes</span>
        </div>
        <div
          className="h-10 w-10 flex items-center justify-center  cursor-pointer"
          onClick={handleAddOneNote}
        >
          <span className="font-bold text-3xl text-green-500">+</span>
        </div>
      </div>

      <div
        className={`fixed z-10 inset-0 py-3 ${
          isOpened ? "w-80" : "w-0"
        } duration-300 bg-gray-600 overflow-x-hidden`}
      >
        <div className="sticky px-3 pb-3 w-full flex items-end justify-between">
          <h3 className="text-xl text-center font-bold text-nowrap">
            All notes
          </h3>

          <div
            className="ml-auto mr-4 h-8 w-8 flex items-center justify-center  cursor-pointer"
            onClick={handleAddOneNote}
          >
            <span className="font-bold text-3xl text-green-500">+</span>
          </div>

          <div
            className={`h-8 w-8 flex items-center justify-center border rounded-full font-bold bg-red-500 shadow-md cursor-pointer ${
              isOpened ? "" : "hidden"
            }`}
            onClick={() => setIsOpened(false)}
          >
            X
          </div>
        </div>

        <ul className="h-[90%] flex flex-col overflow-x-hidden">
          {notes.map((_, i) => {
            const note = notes[notes.length - 1 - i];

            return (
              <li
                key={note.id}
                className="py-3 px-4 flex items-center justify-between odd:bg-slate-700 odd:bg-opacity-20"
              >
                <span className="mr-2 text-nowrap truncate">{note.title}</span>

                <span className="h-5 w-5 bg-slate-700 border-4 rounded-full shrink-0" />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
