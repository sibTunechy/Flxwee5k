import React, { useState, useEffect } from 'react';
import { StickyNote, Save } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function QuickNotes() {
  const [notes, setNotes] = useLocalStorage('quick-notes', '');
  const [localNotes, setLocalNotes] = useState(notes);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localNotes !== notes) {
        setNotes(localNotes);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [localNotes, notes, setNotes]);

  const handleManualSave = () => {
    setNotes(localNotes);
    setLastSaved(new Date());
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <StickyNote className="h-6 w-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Quick Notes</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {lastSaved && (
            <span className="text-xs text-white/60">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleManualSave}
            className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-sm transition-colors duration-200"
          >
            <Save className="h-3 w-3" />
            Save
          </button>
        </div>
      </div>

      <textarea
        value={localNotes}
        onChange={(e) => setLocalNotes(e.target.value)}
        placeholder="Jot down your thoughts, ideas, or reminders..."
        className="w-full h-40 bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 resize-none"
      />
      
      <p className="text-xs text-white/50 mt-2">
        Changes are automatically saved after 1 second of inactivity
      </p>
    </div>
  );
}