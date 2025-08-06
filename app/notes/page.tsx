import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";

const NotesPage = async () => {
  const page = 1;
  const search = "";

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialPage={page} initialSearch={search} initialData={data} />
    </HydrationBoundary>
  );
};

export default NotesPage;
