'use client';

import { useState, useEffect } from 'react';

export default function AnimationLoaderPage() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setLoaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  if (loaded) {
    window.location.href = '/main';
  }

  return (
    <div className="loader-container">
      <div className="loader-content">
        <h1>AMKyawDev Recap App</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p>Loading... {progress}%</p>
      </div>
    </div>
  );
}