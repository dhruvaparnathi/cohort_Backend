import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  function fetchNotes() {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        console.log(res.data);

        const data = res.data.note;
        setNotes(Array.isArray(data) ? data : data.notes || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function submitHandler(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        fetchNotes();
        e.target.reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteNote(noteId) {
    axios
      .delete("http://localhost:3000/api/notes/" + noteId)
      .then((res) => {
        fetchNotes();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function updateNote(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .patch("http://localhost:3000/api/notes/" + currentNote._id, {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        fetchNotes();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function openUpdate(note) {
    setCurrentNote(note);
    setIsEditing(true);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app">
      <h1 className="heading">📝 My Notes</h1>

      <form className="note-form" onSubmit={submitHandler}>
        <input name="title" type="text" placeholder="Title" required />
        <input
          name="description"
          type="text"
          placeholder="Description"
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <div className="notes-container">
        {notes.length === 0 ? (
          <p className="empty">No notes found</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.description}</p>

              <div className="actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteNote(note._id)}
                >
                  Delete
                </button>
                <button className="update-btn" onClick={() => openUpdate(note)}>
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
        {isEditing && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Note</h2>

              <form onSubmit={updateNote}>
                <input name="title" defaultValue={currentNote.title} required />
                <input
                  name="description"
                  defaultValue={currentNote.description}
                  required
                />

                <div className="modal-actions">
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
