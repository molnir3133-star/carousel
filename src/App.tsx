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
  { url: "https://www.flosecret.com/product-page/sweet", image: "https://static.wixstatic.com/media/667148_d24a3c5b0f714cc8b750428755388e7c~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_d24a3c5b0f714cc8b750428755388e7c~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/t1-hoop-lab-diamond", image: "https://static.wixstatic.com/media/667148_4b8d33f5004844cc891580029e2372d7~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_4b8d33f5004844cc891580029e2372d7~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/chaine-d-ancre-earring", image: "https://static.wixstatic.com/media/667148_6d4983027d4a4a9f9cd78472ac161e99~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_6d4983027d4a4a9f9cd78472ac161e99~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/d-amour-stud-earrings-mini-pave", image: "https://static.wixstatic.com/media/667148_6a54034a313c4c54bc7d45942eea2d76~mv2.jpg/v1/fill/w_498,h_665,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_6a54034a313c4c54bc7d45942eea2d76~mv2.jpg" },
  { url: "https://www.flosecret.com/product-page/butterfly-silhouette-lab-diamond", image: "https://static.wixstatic.com/media/667148_3bf27f671430447e99dd1f191583164d~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_3bf27f671430447e99dd1f191583164d~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/clash-de-s-pave-1", image: "https://static.wixstatic.com/media/667148_d1ea659cb3754b549360886d20597764~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_d1ea659cb3754b549360886d20597764~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/b-zero1-1", image: "https://static.wixstatic.com/media/667148_c0ea96bf1d6147c98d3b0b6fbab651e3~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_c0ea96bf1d6147c98d3b0b6fbab651e3~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/serpenti-earring-half-pave", image: "https://static.wixstatic.com/media/667148_012f39b67082425d9d389b1eac518424~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_012f39b67082425d9d389b1eac518424~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/coco-crush-earring-quilted-motif", image: "https://static.wixstatic.com/media/667148_e2ddb22ba8284e65a4d3b023a0f2cd46~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_e2ddb22ba8284e65a4d3b023a0f2cd46~mv2.jpeg" },
  { url: "https://www.flosecret.com/product-page/alhambra-sweet-clasp-earring", image: "https://static.wixstatic.com/media/667148_e3bb52e0b579414f863fd6cdbe813bd3~mv2.jpg/v1/fill/w_498,h_665,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_e3bb52e0b579414f863fd6cdbe813bd3~mv2.jpg" },
  { url: "https://www.flosecret.com/product-page/7-alhambra-sweet-earring", image: "https://static.wixstatic.com/media/667148_695cc949d00e4239800ae6933787ea0e~mv2.jpg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_695cc949d00e4239800ae6933787ea0e~mv2.jpg" }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  const restoreProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    setLikedProducts(prev => prev.filter(p => p.url !== product.url));
  };

  return (
    <div style={{ 
      width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      touchAction: 'none', position: 'fixed', backgroundColor: '#000' // 배경 블랙으로 고급화
    }}>
      <CarouselStack 
        products={products} 
        setProducts={setProducts}
        onLike={(p) => setLikedProducts(prev => [p, ...prev])}
      />

      {/* 하단 찜한 목록 */}
      <div style={{ position: 'absolute', bottom: '25px', width: '100%', zIndex: 100 }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '0 20px' }}>
          <AnimatePresence>
            {likedProducts.map((p) => (
              <motion.img 
                key={p.url}
                layoutId={p.url}
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                src={p.image} 
                onClick={() => restoreProduct(p)}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} 
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
