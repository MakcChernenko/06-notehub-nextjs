import axios from "axios";
import { Note, NewNote } from "../types/note";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${API_TOKEN}`;

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search } = params;

  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
  });

  return data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`
  );
  return data;
};
