'use client';

import { useCallback, useRef } from 'react';

interface UploadButtonProps {
  onUpload: (file: File) => void;
  accept?: string;
}

export default function UploadButton({ onUpload, accept = 'video/*' }: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  }, [onUpload]);

  return (
    <div className="upload-button">
      <button onClick={handleClick}>Upload Video</button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}