import React, { useEffect, useState } from "react";
import API from "../api/api";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");

  const fetchNotes = async () => {
    const res = await API.get("notes/");
    setNotes(res.data);
    setFilteredNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      fetchNotes();
    }
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await API.put(`notes/${editId}/`, form);
      setEditId(null);
    } else {
      await API.post("notes/", form);
    }

    setForm({ title: "", description: "", category: "" });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`notes/${id}/`);
    fetchNotes();
  };

  const editNote = (note) => {
    setForm({
      title: note.title,
      description: note.description,
      category: note.category,
    });
    setEditId(note.id);
  };

  const handleFilter = (value) => {
    setFilter(value);

    if (value === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.category.toLowerCase() === value.toLowerCase()
      );
      setFilteredNotes(filtered);
    }
  };

  return (
    <div>
      <h2>Notes</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br></br>
      <br></br>

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <br></br>
      <br></br>
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
        <br></br>
        <br></br>


      <button onClick={handleSubmit}>
        {editId ? "Update Note" : "Add Note"}
      </button>
      <br></br>

      <h3>Filter by Category</h3>
      <input
        placeholder="Enter category"
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
      />
      <br></br>

      {filteredNotes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        filteredNotes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <p><b>{note.category}</b></p>

            <button onClick={() => editNote(note)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;