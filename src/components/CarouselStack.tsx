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
              // layoutId를 유지하되, 형태(Shape) 왜곡을 막기 위해 layout 속성을 'position'으로 제한합니다.
              layout="position" 
              style={{
                position: 'absolute', width: '100%', height: '100%',
                backgroundColor: '#fff',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                display: 'flex', flexDirection: 'column', 
                overflow: 'hidden',
                borderRadius: '20px', // 기본값 설정
                zIndex: 50 - index,
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                opacity: 1 - index * 0.2,
                borderRadius: '20px', // 애니메이션 중에도 사각형 강제
              }}
              exit={{ 
                x: direction * 500, 
                opacity: 0, 
                rotate: direction * 20,
                borderRadius: '20px', // 사라질 때도 타원형 방지
                transition: { duration: 0.3 }
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <motion.img 
                  layout="position" // 이미지 형태 왜곡 방지
                  src={product.image} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '20px' 
                  }} 
                  draggable={false} 
                />
                
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '45%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
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
