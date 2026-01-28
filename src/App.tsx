import { useState } from "react";
import CarouselStack from "./components/CarouselStack";
import { AnimationSettings } from "./components/SettingsPanel";

export interface Product {
  url: string;
  image: string;
}

// ... products 데이터는 동일 ...

export default function App() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [settings] = useState<AnimationSettings>({
    springDuration: 0.4,
    springBounce: 0.1,
    xSpringDuration: 0.5,
    xSpringBounce: 0,
    dragElastic: 0.05,
    swipeConfidenceThreshold: 1000,
    zIndexDelay: 0.05,
  });

  return (
    <div className="App" style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden',
      touchAction: 'none',
      position: 'fixed',
      backgroundColor: '#fff'
    }}>
      {/* 카로셀 영역 */}
      <CarouselStack 
        settings={settings} 
        products={products} 
        onLike={(p) => setLikedProducts(prev => [...prev, p])}
      />

      {/* 하단 찜한 목록 (오른쪽으로 슬라이드한 제품들) */}
      {likedProducts.length > 0 && (
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          width: '90%', 
          display: 'flex', 
          gap: '10px', 
          overflowX: 'auto',
          padding: '10px',
          borderTop: '1px solid #eee'
        }}>
          {likedProducts.map((p, i) => (
            <motion.img 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              key={i} 
              src={p.image} 
              style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
