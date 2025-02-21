"use client";

import { useState } from "react";

import { Note } from "@/types/note";
import { bodyToggler } from "@/utils/helpers";

type Props = {
  notes: Note[];
  onSetActiveNote: (obj: Note | null) => void;
};

export function SideBar({ notes, onSetActiveNote }: Props) {
  const [isOpened, setIsOpened] = useState(true);

  function editNote(obj: Note) {
    onSetActiveNote(obj);
    setIsOpened(false);
    bodyToggler(false);
  }

  function handleIsOpened() {
    setIsOpened((prev) => !prev);
    bodyToggler(!isOpened);
  }

  function handleAddOneNote() {
    // if (!db) return;
    // notesService.addOne(db, {
    //   id: `todo-${Math.random()}`,
    //   title: `title lorem -${Math.random()}`,
    //   body: `lorem ipsum dolor-${Math.random()}${Math.random()}${Math.random()}`,
    // });
  }

  return (
    <>
      <div className="sticky p-2 w-full flex justify-between border-b">
        <div
          className="p-2 flex items-center justify-center bg-slate-600 cursor-pointer"
          onClick={handleIsOpened}
        >
          <span className="font-bold">See all notes</span>
        </div>
        <div
          className="h-10 w-10 flex items-center justify-center  cursor-pointer"
          onClick={() => editNote({ id: "new", title: "", body: "" })}
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
            onClick={() => editNote({ id: "new", title: "", body: "" })}
          >
            <span className="font-bold text-3xl text-green-500">+</span>
          </div>

          <div
            className={`h-8 w-8 flex items-center justify-center border rounded-full font-bold bg-red-500 shadow-md cursor-pointer ${
              isOpened ? "" : "hidden"
            }`}
            onClick={handleIsOpened}
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
                className="px-4 flex items-center justify-between odd:bg-slate-700 odd:bg-opacity-20"
              >
                <span
                  className="mr-2 py-3 text-nowrap truncate"
                  onClick={() => editNote(note)}
                >
                  {note.title}
                </span>

                <span className="h-5 w-5 bg-slate-700 border-4 rounded-full shrink-0" />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
