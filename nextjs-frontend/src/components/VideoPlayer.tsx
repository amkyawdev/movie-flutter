'use client';

import { useRef, useEffect, useCallback } from 'react';

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

interface VideoPlayerProps {
  src: string | null;
  subtitles: Subtitle[];
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  options: EditingOptions;
}

export default function VideoPlayer({ 
  src, 
  subtitles, 
  currentTime, 
  onTimeUpdate,
  options 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  }, [onTimeUpdate]);

  const getCurrentSubtitle = useCallback((): Subtitle | undefined => {
    const timeStr = formatTime(currentTime);
    return subtitles.find(sub => 
      timeStr >= sub.startTime && timeStr <= sub.endTime
    );
  }, [subtitles, currentTime]);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw current subtitle
    const currentSub = getCurrentSubtitle();
    if (currentSub) {
      ctx.font = `${options.fontSize}px ${options.font}`;
      ctx.fillStyle = options.color;
      ctx.textAlign = 'center';
      
      const textWidth = ctx.measureText(currentSub.text).width;
      const padding = 10;
      
      // Draw background
      const bgX = (canvas.width - textWidth) / 2 - padding;
      const bgY = canvas.height - options.fontSize - 20;
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(bgX, bgY, textWidth + padding * 2, options.fontSize + padding);
      
      // Draw text
      ctx.fillStyle = options.color;
      ctx.fillText(currentSub.text, canvas.width / 2, canvas.height - 20);
    }
  }, [currentTime, getCurrentSubtitle, options]);

  if (!src) {
    return (
      <div className="video-placeholder">
        <p>No video loaded</p>
      </div>
    );
  }

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={src}
        controls
        onTimeUpdate={handleTimeUpdate}
        style={{ maxWidth: '100%' }}
      />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}