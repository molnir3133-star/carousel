import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../App';

interface Props {
  products: Product[];
  settings: any;
  onLike: (product: Product) => void;
}

const CarouselStack: React.FC<Props> = ({ products: initialProducts, settings, onLike }) => {
  const [stack, setStack] = useState(initialProducts);
  const [exitX, setExitX] = useState<number>(0);

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      // 오른쪽으로 슬라이드 (좋아요)
      setExitX(500);
      const likedItem = stack[0];
      onLike(likedItem);
      nextCard();
    } else if (info.offset.x < -swipeThreshold) {
      // 왼쪽으로 슬라이드 (패스)
      setExitX(-500);
      nextCard();
    }
  };

  const nextCard = () => {
    setTimeout(() => {
      setStack((prev) => {
        const newStack = [...prev];
        const first = newStack.shift();
        if (first) newStack.push(first);
        return newStack;
      });
      setExitX(0); // 방향 초기화
    }, 10);
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '85vw', // 화면 너비의 85% (충분히 크게)
      height: '65vh', // 화면 높이의 65% (약 70% 차지)
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <AnimatePresence>
        {stack.slice(0, 3).reverse().map((product, revIndex) => {
          const index = (stack.length > 3 ? 2 : stack.length - 1) - revIndex;
          const isTop = index === 0;
          
          return (
            <motion.div
              key={product.url}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '30px',
                backgroundColor: 'white',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                cursor: isTop ? 'grab' : 'default',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #f0f0f0',
                touchAction: 'none'
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                zIndex: 50 - index,
                opacity: 1
              }}
              exit={{ 
                x: exitX, 
                opacity: 0,
                rotate: exitX / 10,
                transition: { duration: 0.3 } 
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div style={{ flex: 1, backgroundColor: '#fff' }}>
                <img 
                  src={product.image} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  draggable={false} 
                />
              </div>
              <div style={{ padding: '25px', textAlign: 'center', background: '#fff' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#111' }}>
                  {product.url.split('/').pop()?.replace(/-/g, ' ').toUpperCase()}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CarouselStack;
