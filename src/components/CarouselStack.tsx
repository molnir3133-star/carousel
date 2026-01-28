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
    if (info.offset.x > 70) { 
      setDirection(1);
      onLike(products[0]);
      removeTopCard();
    } else if (info.offset.x < -70) { 
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
    <div style={{ position: 'relative', width: '85vw', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                borderRadius: '25px', backgroundColor: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                border: '1px solid #f5f5f5'
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 12,
                zIndex: 50 - index,
                opacity: 1
              }}
              exit={{ x: direction * 500, opacity: 0, rotate: direction * 15 }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div 
                style={{ flex: 1, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => isTop && window.open(product.url, '_blank')}
              >
                <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} draggable={false} />
              </div>
              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: '0 0 5px 0' }}>
                  {formatName(product.url)}
                </h3>
                <p style={{ fontSize: '9px', color: '#999', margin: 0, letterSpacing: '1px' }}>
                  {isTop ? "TAP IMAGE FOR DETAILS" : ""}
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
