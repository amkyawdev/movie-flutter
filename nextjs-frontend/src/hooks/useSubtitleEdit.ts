'use client';

import { useState, useCallback } from 'react';

interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

export function useSubtitleEdit(initialSubtitles: Subtitle[] = []) {
  const [subtitles, setSubtitles] = useState<Subtitle[]>(initialSubtitles);

  const addSubtitle = useCallback((subtitle: Omit<Subtitle, 'id'>) => {
    const newSub: Subtitle = {
      id: Date.now(),
      ...subtitle,
    };
    setSubtitles(prev => [...prev, newSub].sort(compareSubtitles));
  }, []);

  const updateSubtitle = useCallback((id: number, updates: Partial<Subtitle>) => {
    setSubtitles(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
  }, []);

  const deleteSubtitle = useCallback((id: number) => {
    setSubtitles(prev => prev.filter(s => s.id !== id));
  }, []);

  const importSRT = useCallback((content: string) => {
    const parsed = parseSRT(content);
    setSubtitles(parsed.sort(compareSubtitles));
  }, []);

  const exportSRT = useCallback(() => {
    return subtitles.map((sub, index) => 
      `${index + 1}\n${sub.startTime} --> ${sub.endTime}\n${sub.text}\n`
    ).join('\n');
  }, [subtitles]);

  const compareSubtitles = (a: Subtitle, b: Subtitle): number => {
    return a.startTime.localeCompare(b.startTime);
  };

  const parseSRT = (content: string): Subtitle[] => {
    const blocks = content.trim().split(/\n\n+/);
    return blocks.map(block => {
      const lines = block.split('\n');
      const times = lines[1]?.split(' --> ') || [];
      return {
        id: parseInt(lines[0]) || Date.now(),
        startTime: times[0]?.trim() || '00:00:00,000',
        endTime: times[1]?.trim() || '00:00:05,000',
        text: lines.slice(2).join('\n'),
      };
    });
  };

  return {
    subtitles,
    setSubtitles,
    addSubtitle,
    updateSubtitle,
    deleteSubtitle,
    importSRT,
    exportSRT,
  };
}