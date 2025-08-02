import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

// ❗ Уникаємо зовнішніх типів — прямо в аргументах
export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  const noteId = params.id;

  if (!noteId || typeof noteId !== "string") {
    throw new Error("Invalid note ID");
  }

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={noteId} />
    </HydrationBoundary>
  );
}
