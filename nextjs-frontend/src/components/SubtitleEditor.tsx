'use client';

import { useCallback, useState } from 'react';

interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

interface SubtitleEditorProps {
  subtitles: Subtitle[];
  onChange: (subtitles: Subtitle[]) => void;
}

export default function SubtitleEditor({ subtitles, onChange }: SubtitleEditorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newSubtitle, setNewSubtitle] = useState({ startTime: '00:00:00,000', endTime: '00:00:05,000', text: '' });

  const handleAdd = useCallback(() => {
    const newSub: Subtitle = {
      id: Date.now(),
      ...newSubtitle,
    };
    onChange([...subtitles, newSub]);
    setNewSubtitle({ startTime: '00:00:00,000', endTime: '00:00:05,000', text: '' });
  }, [newSubtitle, subtitles, onChange]);

  const handleDelete = useCallback((id: number) => {
    onChange(subtitles.filter(s => s.id !== id));
  }, [subtitles, onChange]);

  const handleUpdate = useCallback((id: number, field: keyof Subtitle, value: string) => {
    onChange(subtitles.map(s => s.id === id ? { ...s, [field]: value } : s));
  }, [subtitles, onChange]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = parseSRT(content);
      onChange(parsed);
    };
    reader.readAsText(file);
  }, [onChange]);

  const parseSRT = (content: string): Subtitle[] => {
    const blocks = content.trim().split(/\n\n+/);
    return blocks.map(block => {
      const lines = block.split('\n');
      const times = lines[1]?.split(' --> ') || [];
      return {
        id: parseInt(lines[0]) || Date.now(),
        startTime: times[0] || '00:00:00,000',
        endTime: times[1] || '00:00:05,000',
        text: lines.slice(2).join('\n'),
      };
    });
  };

  return (
    <div className="subtitle-editor">
      <h3>Subtitle Editor</h3>
      
      <div className="add-subtitle">
        <input
          type="text"
          placeholder="Start time"
          value={newSubtitle.startTime}
          onChange={e => setNewSubtitle({ ...newSubtitle, startTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="End time"
          value={newSubtitle.endTime}
          onChange={e => setNewSubtitle({ ...newSubtitle, endTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subtitle text"
          value={newSubtitle.text}
          onChange={e => setNewSubtitle({ ...newSubtitle, text: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="import-export">
        <label>
          Import SRT:
          <input type="file" accept=".srt" onChange={handleFileUpload} />
        </label>
      </div>

      <div className="subtitle-list">
        {subtitles.map(sub => (
          <div key={sub.id} className={`subtitle-item ${selectedId === sub.id ? 'selected' : ''}`}>
            <div className="subtitle-times">
              <input
                type="text"
                value={sub.startTime}
                onChange={e => handleUpdate(sub.id, 'startTime', e.target.value)}
              />
              <span>{'-->'}</span>
              <input
                type="text"
                value={sub.endTime}
                onChange={e => handleUpdate(sub.id, 'endTime', e.target.value)}
              />
            </div>
            <textarea
              value={sub.text}
              onChange={e => handleUpdate(sub.id, 'text', e.target.value)}
            />
            <button onClick={() => handleDelete(sub.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}