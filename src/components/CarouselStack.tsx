import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../App';

interface Props {
  products: Product[];
  settings: any;
}

const CarouselStack: React.FC<Props> = ({ products: initialProducts, settings }) => {
  const [stack, setStack] = useState(initialProducts);

  // 드래그가 끝났을 때 카드를 뒤로 보내는 로직
  const handleDragEnd = (_: any, info: any) => {
    // 좌우로 100픽셀 이상 밀었을 때 작동
    if (Math.abs(info.offset.x) > 100) {
      setStack((prev) => {
        const newStack = [...prev];
        const first = newStack.shift();
        if (first) newStack.push(first);
        return newStack;
      });
    }
  };

  // URL에서 제품명을 예쁘게 추출하는 함수
  const formatName = (url: string) => {
    const slug = url.split('/').pop() || "";
    return slug.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <div style={{ position: 'relative', width: '320px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimatePresence initial={false}>
        {stack.map((product, index) => {
          // 맨 위의 카드만 드래그 가능하게 설정
          const isTop = index === 0;
          
          return (
            <motion.div
              key={product.url}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                backgroundColor: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                cursor: isTop ? 'grab' : 'default',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #eee'
              }}
              // 스택 겹침 애니메이션
              animate={{
                scale: 1 - index * 0.05,
                y: index * 12,
                zIndex: stack.length - index,
                opacity: index > 3 ? 0 : 1 // 4번째 카드부터는 숨김처리하여 깔끔하게 유지
              }}
              transition={{
                type: "spring",
                duration: settings.springDuration,
                bounce: settings.springBounce
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileTap={isTop ? { scale: 1.02, cursor: 'grabbing' } : {}}
            >
              {/* 이미지 섹션 */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt="jewelry" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  draggable={false} 
                />
              </div>

              {/* 텍스트 정보 섹션 */}
              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  color: '#222',
                  letterSpacing: '0.5px',
                  lineHeight: '1.4'
                }}>
                  {formatName(product.url)}
                </h3>
                <button 
                  onClick={() => window.open(product.url, '_blank')}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '20px',
                    border: '1px solid #222',
                    backgroundColor: 'transparent',
                    fontSize: '11px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  SHOP NOW
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* 하단 스와이프 안내 (선택 사항) */}
      <span style={{ position: 'absolute', bottom: '-40px', fontSize: '11px', color: '#aaa' }}>
        SWIPE CARDS TO EXPLORE
      </span>
    </div>
  );
};

export default CarouselStack;
