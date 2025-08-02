"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import { FetchNotesResponse } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBar";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./NotesPage.module.css";

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearchTerm.trim(),
      }),
    placeholderData: () =>
      queryClient.getQueryData(["notes", page - 1, debouncedSearchTerm]),
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  console.log("📄 Current page:", page);
  console.log("🔍 Search term:", debouncedSearchTerm);
  if (isError) console.error("❌ Error loading notes:", error);
  if (data) console.log("✅ Notes loaded:", data.notes);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {!isLoading && data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : !isLoading && !isError ? (
        <p>No notes found.</p>
      ) : null}

      {isModalOpen &&
        createPortal(
          <Modal onClose={handleCloseModal}>
            <NoteForm onSuccess={handleCloseModal} />
          </Modal>,
          document.getElementById("modal-root") as HTMLElement
        )}
    </div>
  );
};

export default Notes;
