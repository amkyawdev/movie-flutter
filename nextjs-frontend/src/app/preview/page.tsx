'use client';

import { useState, useRef, useCallback } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import DownloadButtons from '@/components/DownloadButtons';

interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

interface EditingOptions {
  font: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
}

export default function PreviewPage() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [options, setOptions] = useState<EditingOptions>({
    font: 'Arial',
    fontSize: 24,
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)',
  });
  const [processing, setProcessing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleExport = useCallback(async (format: 'mp4' | 'srt') => {
    if (!videoSrc || format === 'srt') {
      // Download SRT file
      const srtContent = subtitles.map((sub, index) => 
        `${index + 1}\n${sub.startTime} --> ${sub.endTime}\n${sub.text}\n`
      ).join('\n');
      
      const blob = new Blob([srtContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'subtitles.srt';
      a.click();
    } else {
      // Process video with FFmpeg
      setProcessing(true);
      // Simulate processing
      setTimeout(() => setProcessing(false), 2000);
    }
  }, [videoSrc, subtitles]);

  return (
    <div className="preview-container">
      <h1>Preview & Download</h1>
      
      <div className="preview-video">
        <VideoPlayer 
          src={videoSrc}
          subtitles={subtitles}
          currentTime={currentTime}
          onTimeUpdate={setCurrentTime}
          options={options}
        />
      </div>
      
      {processing && <div className="processing-overlay">Processing...</div>}
      
      <DownloadButtons onExport={handleExport} />
    </div>
  );
}