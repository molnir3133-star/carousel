import { SettingsPanel, AnimationSettings } from "./components/SettingsPanel";
// (AnimationSettings를 이제 SettingsPanel 파일에서 가져옵니다)
import { useState } from "react";
import CarouselStack from "./components/CarouselStack";
import { SettingsPanel, AnimationSettings } from "./components/SettingsPanel";

const products = [
  {
    url: "https://www.flosecret.com/product-page/jeux-de-liens-mother-of-pearl-lab-diamond",
    image: "https://static.wixstatic.com/media/667148_6f71e821a95b44c5a4874b19f281c626~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_6f71e821a95b44c5a4874b19f281c626~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/7-clash-de-small",
    image: "https://static.wixstatic.com/media/667148_fe03d05cc40e4a6c82ea0430d1b03182~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_fe03d05cc40e4a6c82ea0430d1b03182~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/frivole-earrings-small-lab-diamond",
    image: "https://static.wixstatic.com/media/667148_30d243ca5dd04136ad4fd99a6ece796d~mv2.jpg/v1/fill/w_498,h_665,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_30d243ca5dd04136ad4fd99a6ece796d~mv2.jpg"
  },
  {
    url: "https://www.flosecret.com/product-page/sweet",
    image: "https://static.wixstatic.com/media/667148_d24a3c5b0f714cc8b750428755388e7c~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_d24a3c5b0f714cc8b750428755388e7c~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/t1-hoop-lab-diamond",
    image: "https://static.wixstatic.com/media/667148_4b8d33f5004844cc891580029e2372d7~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_4b8d33f5004844cc891580029e2372d7~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/chaine-d-ancre-earring",
    image: "https://static.wixstatic.com/media/667148_6d4983027d4a4a9f9cd78472ac161e99~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_6d4983027d4a4a9f9cd78472ac161e99~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/d-amour-stud-earrings-mini-pave",
    image: "https://static.wixstatic.com/media/667148_6a54034a313c4c54bc7d45942eea2d76~mv2.jpg/v1/fill/w_498,h_665,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_6a54034a313c4c54bc7d45942eea2d76~mv2.jpg"
  },
  {
    url: "https://www.flosecret.com/product-page/butterfly-silhouette-lab-diamond",
    image: "https://static.wixstatic.com/media/667148_3bf27f671430447e99dd1f191583164d~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_3bf27f671430447e99dd1f191583164d~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/clash-de-s-pave-1",
    image: "https://static.wixstatic.com/media/667148_d1ea659cb3754b549360886d20597764~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_d1ea659cb3754b549360886d20597764~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/b-zero1-1",
    image: "https://static.wixstatic.com/media/667148_c0ea96bf1d6147c98d3b0b6fbab651e3~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_c0ea96bf1d6147c98d3b0b6fbab651e3~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/serpenti-earring-half-pave",
    image: "https://static.wixstatic.com/media/667148_012f39b67082425d9d389b1eac518424~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_012f39b67082425d9d389b1eac518424~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/coco-crush-earring-quilted-motif",
    image: "https://static.wixstatic.com/media/667148_e2ddb22ba8284e65a4d3b023a0f2cd46~mv2.jpeg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_e2ddb22ba8284e65a4d3b023a0f2cd46~mv2.jpeg"
  },
  {
    url: "https://www.flosecret.com/product-page/alhambra-sweet-clasp-earring",
    image: "https://static.wixstatic.com/media/667148_e3bb52e0b579414f863fd6cdbe813bd3~mv2.jpg/v1/fill/w_498,h_665,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_e3bb52e0b579414f863fd6cdbe813bd3~mv2.jpg"
  },
  {
    url: "https://www.flosecret.com/product-page/7-alhambra-sweet-earring",
    image: "https://static.wixstatic.com/media/667148_695cc949d00e4239800ae6933787ea0e~mv2.jpg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/667148_695cc949d00e4239800ae6933787ea0e~mv2.jpg"
  }
];

export default function App() {
  const [settings, setSettings] = useState<AnimationSettings>({
    springDuration: 0.3,
    springBounce: 0.3,
    xSpringDuration: 0.5,
    xSpringBounce: 0.1,
    dragElastic: 0.7,
    swipeConfidenceThreshold: 10000,
    zIndexDelay: 0.05,
  });

  return (
    <div className="App w-full h-screen bg-gray-50 flex items-center justify-center overflow-hidden relative">
      <div className="hero-container w-full h-full flex items-center justify-center">
        <div className="container flex items-center justify-center">
          <CarouselStack settings={settings} products={products} />
        </div>
      </div>
      <SettingsPanel
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
}
