'use client';

export default function NoteItem({ note, onDelete, onEdit }) {
  return (
    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex flex-col justify-between gap-3">
      <div>
        <h3 className="font-bold text-lg text-emerald-400 mb-1">{note.title}</h3>
        <p className="text-slate-300 text-sm whitespace-pre-wrap">{note.description}</p>
      </div>

      <div className="flex gap-2 justify-end pt-2 border-t border-slate-700/50">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs rounded-lg hover:bg-amber-500/30 transition-all font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs rounded-lg hover:bg-rose-500/30 transition-all font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}