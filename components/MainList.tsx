"use client";

import { Note } from "@/types/note";

type Props = {
  notes: Note[];
  onSetActiveNote: (obj: Note | null) => void;
};

export function MainList({ notes, onSetActiveNote }: Props) {
  return (
    <ul className="px-1 flex flex-wrap">
      {[...notes]
        .sort((a, b) => b.updated - a.updated)
        .map((note) => (
          <li key={note.id} className="w-1/3 lg:w-1/4 p-2">
            <div
              className="relative p-2 h-36 bg-slate-600 overflow-hidden rounded-lg border-r border-b cursor-pointer hover:bg-slate-500 duration-150"
              onClick={() => onSetActiveNote(note)}
            >
              <h6 className="text-xs font-thin break-words">{note.title}</h6>
              <p className="mt-1 text-[9px] font-thin break-words">
                {note.body}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
}
