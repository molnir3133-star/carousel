import { AnimationSettings } from "./components/SettingsPanel";
// (마찬가지로 타입을 SettingsPanel에서 가져오도록 통일합니다)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../App";
import { AnimationSettings } from "./SettingsPanel";

type Props = {
  products: Product[];
  settings: AnimationSettings;
};

const CarouselStack: React.FC<Props> = ({ products, settings }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % products.length);

  return (
    <div className="relative w-64 h-96">
      <AnimatePresence>
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -settings.swipeConfidenceThreshold / 100) next();
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: settings.springDuration }}
          className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <img src={products[index].image} alt="" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CarouselStack;