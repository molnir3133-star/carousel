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

  const formatName = (url: string) => {
    const slug = url.split('/').pop() || "";
    return slug.replace(/-/g, ' ').toUpperCase();
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 80) { 
      setDirection(1);
      onLike(products[0]);
      removeTopCard();
    } else if (info.offset.x < -80) { 
      setDirection(-1);
      removeTopCard();
    }
  };

  const removeTopCard = () => {
    setTimeout(() => {
      setProducts((prev) => prev.slice(1));
      setDirection(0);
    }, 50);
  };

  return (
    <div style={{ position: 'relative', width: '90vw', height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimatePresence mode="popLayout">
        {products.slice(0, 3).reverse().map((product, revIndex) => {
          const index = (products.length > 3 ? 2 : products.length - 1) - revIndex;
          const isTop = index === 0;

          return (
            <motion.div
              key={product.url}
              layoutId={product.url}
              // 타원형 방지를 위해 borderRadius 고정 및 layout 속성 추가
              layout
              style={{
                position: 'absolute', width: '100%', height: '100%',
                borderRadius: '20px', backgroundColor: '#fff',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                // 가로세로 비율 유지 강제
                aspectRatio: 'unset' 
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                zIndex: 50 - index,
                opacity: 1 - index * 0.2,
                borderRadius: '20px' // 애니메이션 중에도 사각형 유지
              }}
              exit={{ 
                x: direction * 500, 
                opacity: 0, 
                rotate: direction * 20,
                borderRadius: '20px' 
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '20px' // 이미지 자체에도 동일한 곡률 적용
                  }} 
                  draggable={false} 
                />
                
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '45%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '30px 20px', textAlign: 'center'
                }}>
                  <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', margin: '0 0 15px 0' }}>
                    {formatName(product.url)}
                  </h3>
                  
                  <button 
                    onClick={() => window.open(product.url, '_blank')}
                    style={{
                      padding: '12px', borderRadius: '12px', border: 'none',
                      backgroundColor: '#fff', color: '#000', fontWeight: 'bold',
                      fontSize: '14px', cursor: 'pointer'
                    }}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CarouselStack;
