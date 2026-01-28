import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../App';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onLike: (product: Product) => void;
}

const CarouselStack: React.FC<Props> = ({ products, setProducts, onLike }) => {
  const [direction, setDirection] = useState(0);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 80) { // 오른쪽: 좋아요
      setDirection(1);
      const likedItem = products[0];
      onLike(likedItem);
      removeTopCard();
    } else if (info.offset.x < -80) { // 왼쪽: 패스
      setDirection(-1);
      removeTopCard();
    }
  };

  const removeTopCard = () => {
    setTimeout(() => {
      setProducts((prev) => prev.slice(1)); // 맨 위 카드 제거
      setDirection(0);
    }, 50);
  };

  return (
    <div style={{ position: 'relative', width: '85vw', height: '65vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimatePresence>
        {products.slice(0, 3).reverse().map((product, revIndex) => {
          const index = (products.length > 3 ? 2 : products.length - 1) - revIndex;
          const isTop = index === 0;

          return (
            <motion.div
              key={product.url}
              layoutId={product.url}
              style={{
                position: 'absolute', width: '100%', height: '100%',
                borderRadius: '30px', backgroundColor: 'white',
                boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                border: '1px solid #f0f0f0', cursor: isTop ? 'grab' : 'default'
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                zIndex: 50 - index,
                opacity: 1
              }}
              exit={{ 
                x: direction * 500, 
                opacity: 0, 
                rotate: direction * 25,
                transition: { duration: 0.4 } 
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div 
                style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}
                onClick={() => isTop && window.open(product.url, '_blank')} // 클릭 시 전체화면(새창)
              >
                <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} draggable={false} />
              </div>
              <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #fafafa' }}>
                <p style={{ fontSize: '14px', fontWeight: '800', color: '#111', margin: 0 }}>
                  {product.url.split('/').pop()?.replace(/-/g, ' ').toUpperCase()}
                </p>
                <p style={{ fontSize: '10px', color: '#ff4d4d', marginTop: '5px' }}>
                  {isTop ? "Swipe Right to Wishlist →" : ""}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {products.length === 0 && (
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: '12px 24px', borderRadius: '20px', border: '1px solid #000', background: '#000', color: '#fff' }}
        >
          RELOAD CARDS
        </button>
      )}
    </div>
  );
};

export default CarouselStack;
