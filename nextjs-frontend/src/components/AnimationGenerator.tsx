'use client';

import { useState } from 'react';

interface AnimationGeneratorProps {
  onAnimationComplete?: () => void;
}

export default function AnimationGenerator({ onAnimationComplete }: AnimationGeneratorProps) {
  const [loading, setLoading] = useState(false);

  const loadFFmpeg = async () => {
    setLoading(true);
    // Simulate loading FFmpeg
    setTimeout(() => {
      setLoading(false);
      onAnimationComplete?.();
    }, 1500);
  };

  return (
    <div className="animation-generator">
      {loading ? (
        <div className="loading">Loading animation engine...</div>
      ) : (
        <button onClick={loadFFmpeg}>Load Animation Engine</button>
      )}
    </div>
  );
}