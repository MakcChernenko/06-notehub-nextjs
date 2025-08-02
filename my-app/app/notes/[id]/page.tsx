import React from "react";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import NoteDetailsClient from "@/components/NoteDetailsClient/NoteDetailsClient";

interface NotePageProps {
  params: {
    id: string;
  };
}

async function NotePage({ params }: NotePageProps) {
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
