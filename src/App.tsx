import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarouselStack from "./components/CarouselStack";

export interface Product {
  url: string;
  image: string;
}

const initialProducts: Product[] = [
  { url: "https://www.flosecret.com/product-page/jeux-de-liens-mother-of-pearl-lab-diamond", image: "https://static.wixstatic.com/media/667148_6f71e821a95b44c5a4874b19f281c626~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_6f71e821a95b44c5a4874b19f281c626~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/7-clash-de-small", image: "https://static.wixstatic.com/media/667148_fe03d05cc40e4a6c82ea0430d1b03182~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_fe03d05cc40e4a6c82ea0430d1b03182~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/frivole-earrings-small-lab-diamond", image: "https://static.wixstatic.com/media/667148_30d243ca5dd04136ad4fd99a6ece796d~mv2.jpg/v1/fill/w_498,h_665,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_30d243ca5dd04136ad4fd99a6ece796d~mv2.jpg" },
  { url: "https://www.flosecret.com/product-page/sweet", image: "https://static.wixstatic.com/media/667148_d24a3c5b0f714cc8b750428755388e7c~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_d24a3c5b0f714cc8b750428755388e7c~mv2.jpeg" }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  // 찜한 목록에서 클릭 시 카로셀로 다시 복구
  const restoreProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    setLikedProducts(prev => prev.filter(p => p.url !== product.url));
  };

  return (
    <div className="App" style={{ 
      width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      touchAction: 'none', position: 'fixed', backgroundColor: '#fff'
    }}>
      <CarouselStack 
        products={products} 
        setProducts={setProducts}
        onLike={(p) => setLikedProducts(prev => [p, ...prev])}
      />

      {/* 하단 찜한 목록 */}
      <div style={{ position: 'absolute', bottom: '30px', textAlign: 'center', width: '100%' }}>
        <p style={{ fontSize: '11px', color: '#aaa', letterSpacing: '2px', marginBottom: '10px' }}>WISHLIST (CLICK TO RESTORE)</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', minHeight: '60px' }}>
          <AnimatePresence>
            {likedProducts.map((p) => (
              <motion.div
                key={p.url}
                layoutId={p.url}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: -20 }}
                onClick={() => restoreProduct(p)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={p.image} 
                  style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
