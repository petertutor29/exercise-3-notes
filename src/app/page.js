'use client';

import { useState, useEffect } from 'react';
import NoteItem from '@/components/NoteItem';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // useEffect Bonus: Check if note title exists
  useEffect(() => {
    if (!title.trim()) {
      setError('');
      return;
    }

    const exists = notes.some(
      (note) =>
        note.title.toLowerCase() === title.trim().toLowerCase() &&
        note.id !== editingId
    );

    if (exists) {
      setError('A note with this title already exists!');
    } else {
      setError('');
    }
  }, [title, notes, editingId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description.');
      return;
    }

    if (error) {
      alert('Cannot save: Note title already exists!');
      return;
    }

    if (editingId) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? { ...note, title: title.trim(), description: description.trim() }
            : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      };
      setNotes([...notes, newNote]);
    }

    setTitle('');
    setDescription('');
    setError('');
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setError('');
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Next.js Note Application
          </h1>
          <p className="text-slate-400 text-sm">
            Simple CRUD Notes App using useState & useEffect
          </p>
        </header>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-emerald-400">
            {editingId ? 'Update Note' : 'Add New Note'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {error && (
                <p className="text-rose-400 text-xs mt-1.5 font-medium">
                  ⚠️ {error}
                </p>
              )}
            </div>

            <div>
              <textarea
                placeholder="Note Description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <div className="flex gap-3 justify-end">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={!!error}
                className={`px-6 py-2.5 font-bold text-sm rounded-xl transition-all ${
                  error
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/10'
                }`}
              >
                {editingId ? 'Update Note' : 'Add Note'}
              </button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-200">
            All Notes ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-500 text-sm">
              No notes created yet. Add your first note above!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}