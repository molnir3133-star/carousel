import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../App';

interface Props {
  products: Product[];
  settings: any;
}

const CarouselStack: React.FC<Props> = ({ products: initialProducts, settings }) => {
  const [stack, setStack] = useState(initialProducts);

  const handleDragEnd = (_: any, info: any) => {
    // 민감도 조절: 50픽셀만 움직여도 다음 카드로 전환
    if (Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 500) {
      setStack((prev) => {
        const newStack = [...prev];
        const first = newStack.shift();
        if (first) newStack.push(first);
        return newStack;
      });
    }
  };

  const formatName = (url: string) => {
    const slug = url.split('/').pop() || "";
    return slug.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '280px', // 모바일 너비 최적화
      height: '440px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <AnimatePresence initial={false}>
        {stack.slice(0, 4).reverse().map((product, revIndex) => {
          // 배열을 뒤집었으므로 실제 인덱스 계산
          const index = 3 - revIndex;
          const isTop = index === 0;
          
          return (
            <motion.div
              key={product.url}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                backgroundColor: 'white',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                overflow: 'hidden',
                cursor: isTop ? 'grab' : 'default',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #f0f0f0',
                touchAction: 'none' // 개별 카드 터치 간섭 방지
              }}
              animate={{
                scale: 1 - index * 0.06,
                y: index * 12,
                zIndex: 10 - index,
                opacity: 1 - index * 0.2
              }}
              exit={{ 
                x: isTop ? (stack[0] === product ? -300 : 0) : 0, 
                opacity: 0,
                transition: { duration: 0.3 } 
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileTap={isTop ? { scale: 1.02 } : {}}
            >
              {/* 이미지 영역 */}
              <div style={{ flex: 1, backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt="jewelry" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} // 제품이 잘리지 않게 조정
                  draggable={false} 
                />
              </div>

              {/* 텍스트 영역 */}
              <div style={{ padding: '15px', textAlign: 'center', backgroundColor: '#fff' }}>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: '#111',
                  height: '34px', // 두 줄까지 허용
                  overflow: 'hidden'
                }}>
                  {formatName(product.url)}
                </h3>
                <button 
                  onClick={() => window.open(product.url, '_blank')}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '15px',
                    border: '1px solid #111',
                    backgroundColor: '#111',
                    color: '#fff',
                    fontSize: '10px',
                    width: '100%',
                    fontWeight: 500
                  }}
                >
                  SHOP NOW
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CarouselStack;
