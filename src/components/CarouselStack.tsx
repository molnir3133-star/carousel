import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// App.tsx에서 내보낸 Product 타입을 가져옵니다.
import { Product } from '../App';

interface Props {
  products: Product[];
  settings: any;
}

const CarouselStack: React.FC<Props> = ({ products, settings }) => {
  return (
    <div style={{ position: 'relative', width: '300px', height: '400px' }}>
      <AnimatePresence>
        {products.map((product, index) => (
          <motion.div
            key={product.url}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1 - index * 0.05, 
              y: index * 10, 
              zIndex: products.length - index, 
              opacity: 1 
            }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onClick={() => window.open(product.url, '_blank')}
          >
            <img 
              src={product.image} 
              alt="jewelry" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CarouselStack;
