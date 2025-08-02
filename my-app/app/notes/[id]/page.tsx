import React from "react";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import NoteDetailsClient from "@/components/NoteDetailsClient/NoteDetailsClient";

async function NotePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(await fetchNoteById(id));
  const note = await fetchNoteById(id);
  return (
    <div>
      <NoteDetailsClient note={note} />
    </div>
  );
}

export default NotePage;
