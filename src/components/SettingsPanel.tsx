import React from 'react';
import { AnimationSettings } from '../App';

interface Props {
  settings: AnimationSettings;
  setSettings: React.Dispatch<React.SetStateAction<AnimationSettings>>;
}

const SettingsPanel: React.FC<Props> = ({ settings, setSettings }) => {
  return (
    <div style={{ width: '250px', backgroundColor: 'white', borderLeft: '1px solid #ddd', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Animation Settings</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontSize: '12px' }}>Stagger: {settings.stagger}</label>
        <input 
          type="range" min="0" max="0.5" step="0.05" 
          value={settings.stagger} 
          onChange={(e) => setSettings({...settings, stagger: parseFloat(e.target.value)})}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontSize: '12px' }}>Rotation: {settings.rotation}°</label>
        <input 
          type="range" min="0" max="45" step="1" 
          value={settings.rotation} 
          onChange={(e) => setSettings({...settings, rotation: parseInt(e.target.value)})}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
