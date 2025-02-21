"use client";

import { useState } from "react";

import { Note } from "@/types/note";

type Props = {
  notes: Note[];
  onSetActiveNote: (obj: Note | null) => void;
};

export function MainList({ notes, onSetActiveNote }: Props) {
  return (
    <ul className="px-1 flex flex-wrap">
      {notes.map((_, i) => {
        const note = notes[notes.length - 1 - i];

        return (
          <li key={note.id} className="w-1/3 lg:w-1/4 p-2">
            <div
              className="relative p-2 h-36 bg-slate-600 overflow-hidden rounded-lg border-r border-b"
              onClick={() => onSetActiveNote(note)}
            >
              <h6 className="text-xs font-thin break-words">{note.title}</h6>
              <p className="mt-1 text-[9px] font-thin break-words">
                {note.body}
              </p>
              <div className="absolute bottom-2 right-2 h-5 w-5 bg-slate-700 border-4 rounded-full shrink-0 shadow-sm" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
