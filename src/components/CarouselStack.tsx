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
                borderRadius: '30px', backgroundColor: '#fff',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden'
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                zIndex: 50 - index,
                opacity: 1 - index * 0.2
              }}
              exit={{ x: direction * 500, opacity: 0, rotate: direction * 20 }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              {/* 이미지: 카드 전체를 채움 */}
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src={product.image} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} // 전체 화면 채우기
                  draggable={false} 
                />
                
                {/* 하단 텍스트 그라데이션 오버레이 */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '30px 20px', textAlign: 'center'
                }}>
                  <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', margin: '0 0 15px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {formatName(product.url)}
                  </h3>
                  
                  {/* 상세 페이지 이동 버튼 */}
                  <button 
                    onClick={() => window.open(product.url, '_blank')}
                    style={{
                      padding: '12px', borderRadius: '15px', border: 'none',
                      backgroundColor: '#fff', color: '#000', fontWeight: 'bold',
                      fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
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
