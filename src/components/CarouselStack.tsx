import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, AnimationSettings } from '../App';

interface Props {
  products: Product[];
  settings: AnimationSettings;
}

const CarouselStack: React.FC<Props> = ({ products, settings }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '40px', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <AnimatePresence>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50, rotate: -settings.rotation }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotate: 0,
              transition: { delay: index * settings.stagger, duration: settings.duration }
            }}
            whileHover={{ scale: 1.05 }}
            style={{
              width: '200px',
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{product.name}</h3>
              <p style={{ margin: 0, color: '#666' }}>{product.price}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CarouselStack;
