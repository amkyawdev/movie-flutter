'use client';

import { useCallback } from 'react';

interface EditingOptions {
  font: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
}

interface EditingOptionsProps {
  options: EditingOptions;
  onChange: (options: EditingOptions) => void;
}

export default function EditingOptionsComponent({ options, onChange }: EditingOptionsProps) {
  const handleChange = useCallback((key: keyof EditingOptions, value: string | number) => {
    onChange({ ...options, [key]: value });
  }, [options, onChange]);

  return (
    <div className="editing-options">
      <h3>Editing Options</h3>
      
      <div className="option-group">
        <label>Font:</label>
        <select 
          value={options.font} 
          onChange={e => handleChange('font', e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      <div className="option-group">
        <label>Font Size:</label>
        <input
          type="range"
          min="12"
          max="72"
          value={options.fontSize}
          onChange={e => handleChange('fontSize', parseInt(e.target.value))}
        />
        <span>{options.fontSize}px</span>
      </div>

      <div className="option-group">
        <label>Text Color:</label>
        <input
          type="color"
          value={options.color}
          onChange={e => handleChange('color', e.target.value)}
        />
      </div>

      <div className="option-group">
        <label>Background:</label>
        <input
          type="color"
          value={options.backgroundColor.replace(/rgba?\([^)]+\)/, '#000000')}
          onChange={e => handleChange('backgroundColor', `rgba(0,0,0,0.5)`)}
        />
      </div>
    </div>
  );
}