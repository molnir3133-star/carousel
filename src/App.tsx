import React, { useState } from 'react';
import CarouselStack from './components/CarouselStack';
import SettingsPanel from './components/SettingsPanel';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface AnimationSettings {
  stagger: number;
  duration: number;
  scale: number;
  rotation: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Premium Watch", price: "$299", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 2, name: "Wireless Headphones", price: "$199", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 3, name: "Smart Camera", price: "$349", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500" },
  { id: 4, name: "Leather Backpack", price: "$149", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500" },
];

const App: React.FC = () => {
  const [settings, setSettings] = useState<AnimationSettings>({
    stagger: 0.1,
    duration: 0.6,
    scale: 0.9,
    rotation: 10,
  });

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#f5f5f5' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <CarouselStack products={initialProducts} settings={settings} />
      </div>
      <SettingsPanel settings={settings} setSettings={setSettings} />
    </div>
  );
};

export default App;
