"use client";

import { useState } from "react";

export function SideBar() {
  const [isOpened, setIsOpened] = useState(true);

  const notes = [
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" },
    { id: 3, title: "Note 3" },
    { id: 4, title: "Note 4" },
    { id: 5, title: "Note 5" },
    { id: 6, title: "Note 6" },
    { id: 7, title: "Note 7" },
    { id: 8, title: "Note 8" },
    { id: 9, title: "Note 9" },
    { id: 10, title: "Note 10" },
    { id: 11, title: "Note 11" },
    { id: 12, title: "Note 12" },
    { id: 13, title: "Note 13" },
    { id: 14, title: "Note 14" },
    { id: 15, title: "Note 15" },
    { id: 16, title: "Note 16" },
    { id: 17, title: "Note 17" },
    { id: 18, title: "Note 18" },
    { id: 19, title: "Note 19" },
    { id: 20, title: "Note 20" },
    { id: 21, title: "Note 21" },
    { id: 22, title: "Note 22" },
    { id: 23, title: "Note 23" },
    { id: 24, title: "Note 24" },
    { id: 25, title: "Note 25" },
    { id: 26, title: "Note 26" },
    { id: 27, title: "Note 27" },
    { id: 28, title: "Note 28" },
    { id: 29, title: "Note 29" },
    { id: 30, title: "Note 30" },
  ];

  return (
    <>
      <div
        className="fixed h-8 w-8 m-2 pb-0.5 flex items-center justify-center border rounded-full bg-slate-600 cursor-pointer"
        onClick={() => setIsOpened(true)}
      >
        <span className="font-bold">&#8594;</span>
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

        <ul className="h-[90%] p-2 flex flex-col gap-2">
          {notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
