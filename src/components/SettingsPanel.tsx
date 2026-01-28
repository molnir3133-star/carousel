import React from "react";

// 1. 다른 파일에서도 사용할 수 있도록 타입을 정의하고 export 합니다.
export type AnimationSettings = {
  springDuration: number;
  springBounce: number;
  xSpringDuration: number;
  xSpringBounce: number;
  dragElastic: number;
  swipeConfidenceThreshold: number;
  zIndexDelay: number;
};

type Props = {
  settings: AnimationSettings;
  onSettingsChange: (s: AnimationSettings) => void;
};

export const SettingsPanel: React.FC<Props> = ({ settings, onSettingsChange }) => {
  return (
    // 윅스 화면 우측 하단에 고정되도록 스타일을 살짝 추가했습니다.
    <div className="absolute bottom-4 right-4 bg-white/80 p-4 rounded-xl shadow-lg backdrop-blur-md z-50 flex flex-col gap-2">
      <label className="text-xs font-bold text-gray-600">Spring Duration</label>
      <input 
        type="range" 
        min="0.1" 
        max="2" 
        step="0.1"
        value={settings.springDuration}
        onChange={(e) => onSettingsChange({ ...settings, springDuration: Number(e.target.value) })} 
        className="cursor-pointer"
      />
      <span className="text-xs text-right">{settings.springDuration}s</span>
    </div>
  );
};