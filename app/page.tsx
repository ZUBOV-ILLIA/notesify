"use client";

import { SideBar } from "@/components/SideBar";
import { useState } from "react";
import { RxDatabase } from "rxdb";

export default function Home() {
  const [activeNote, setActiveNote] = useState("");
  const [db, setDb] = useState<RxDatabase | null>(null);

  return (
    <div className="">
      <SideBar />
      <div>page</div>
    </div>
  );
}
