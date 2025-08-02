"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

interface Props {
  id?: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const params = useParams();

  const routeId = Array.isArray(params.id)
    ? params.id[0]
    : typeof params.id === "string"
      ? params.id
      : undefined;

  const noteId = id ?? routeId;

  const isValidId = typeof noteId === "string" && noteId.length > 0;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId!),
    enabled: isValidId,
  });

  if (!isValidId) return <p>❌ Invalid note ID</p>;
  if (isLoading) return <p>⏳ Loading, please wait...</p>;
  if (error) {
    console.error("❌ Failed to load note:", error);
    return <p>Something went wrong while loading the note.</p>;
  }

  if (!note) return <p>⚠️ Note not found</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
