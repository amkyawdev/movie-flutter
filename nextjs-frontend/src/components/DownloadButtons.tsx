'use client';

import { useState } from 'react';

interface DownloadButtonsProps {
  onExport: (format: 'mp4' | 'srt') => void;
}

export default function DownloadButtons({ onExport }: DownloadButtonsProps) {
  const [processing, setProcessing] = useState(false);

  const handleExport = async (format: 'mp4' | 'srt') => {
    if (format === 'mp4') {
      setProcessing(true);
    }
    await onExport(format);
    setProcessing(false);
  };

  return (
    <div className="download-buttons">
      <button 
        onClick={() => handleExport('mp4')} 
        disabled={processing}
      >
        {processing ? 'Processing...' : 'Download MP4'}
      </button>
      <button onClick={() => handleExport('srt')}>
        Download SRT
      </button>
    </div>
  );
}