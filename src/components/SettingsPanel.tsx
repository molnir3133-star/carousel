import React from 'react';

export interface AnimationSettings {
  springDuration: number;
  springBounce: number;
  xSpringDuration: number;
  xSpringBounce: number;
  dragElastic: number;
  swipeConfidenceThreshold: number;
  zIndexDelay: number;
}

interface Props {
  settings: AnimationSettings;
  onSettingsChange: (settings: AnimationSettings) => void;
}

export const SettingsPanel: React.FC<Props> = ({ settings, onSettingsChange }) => {
  return (
    <div style={{ 
      position: 'absolute', right: 20, top: 20, padding: '20px', 
      background: 'rgba(255,255,255,0.8)', borderRadius: '10px', width: '200px',
      fontSize: '12px', zIndex: 1000 
    }}>
      <h3 style={{ marginTop: 0 }}>Settings</h3>
      {Object.entries(settings).map(([key, value]) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>{key}</label>
          <input 
            type="range" min="0" max="1" step="0.05" 
            value={value} 
            onChange={(e) => onSettingsChange({...settings, [key]: parseFloat(e.target.value)})}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </div>
  );
};
