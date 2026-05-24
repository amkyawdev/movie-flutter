'use client';

import { useState, useRef, useCallback } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import SubtitleEditor from '@/components/SubtitleEditor';
import EditingOptions from '@/components/EditingOptions';

interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

export default function EditingPage() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [editingOptions, setEditingOptions] = useState({
    font: 'Arial',
    fontSize: 24,
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)',
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
  }, []);

  const handleSubtitleChange = useCallback((newSubtitles: Subtitle[]) => {
    setSubtitles(newSubtitles);
  }, []);

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleOptionChange = useCallback((options: typeof editingOptions) => {
    setEditingOptions(options);
  }, []);

  return (
    <div className="editing-container">
      <h1>Editing Page</h1>
      
      <div className="editor-layout">
        <div className="video-section">
          <VideoPlayer 
            src={videoSrc}
            subtitles={subtitles}
            currentTime={currentTime}
            onTimeUpdate={handleTimeUpdate}
            options={editingOptions}
          />
        </div>
        
        <div className="sidebar">
          <EditingOptions options={editingOptions} onChange={handleOptionChange} />
          <SubtitleEditor subtitles={subtitles} onChange={handleSubtitleChange} />
        </div>
      </div>
    </div>
  );
}