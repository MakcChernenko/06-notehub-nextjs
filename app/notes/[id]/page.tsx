import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/components/NoteDetailsClient/NoteDetailsClient";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NoteDetailsClient note={note} />;
}
