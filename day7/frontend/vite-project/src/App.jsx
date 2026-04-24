import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        console.log(res.data); // 👈 check structure

        // FIX: ensure it's always an array
        const data = res.data.note;
        setNotes(Array.isArray(data) ? data : data.notes || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="app">
      <h1 className="heading">📝 My Notes</h1>

      <div className="notes-container">
        {notes.length === 0 ? (
          <p className="empty">No notes found</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App;