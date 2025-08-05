import css from "./NoteDetailsClient.module.css";
import { Note } from "../../../types/note";

interface nodeDetailsClientProps {
  note: Note;
}
console.log("всу ок");

function NoteDetailsClient({ note }: nodeDetailsClientProps) {
  const formatedDate = new Date(note.createdAt).toLocaleDateString();
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formatedDate}</p>
      </div>
    </div>
  );
}

export default NoteDetailsClient;
