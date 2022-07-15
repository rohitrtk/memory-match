import React, { useState, createContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Backdrop.css";

declare interface IProps {
  children?: ReactNode,
  backdropIndex?: number
}

export const BackdropImages = [
  { high: "images/bgs/Maple Island.jpg", low: "images/bgs/L-Maple Island.jpg", sidebarColour: "#e4614f" },
  { high: "images/bgs/Elinia.jpg", low: "images/bgs/L-Elinia.jpg", sidebarColour: "#9e0b0f" },
  { high: "images/bgs/Kerning City.jpg", low: "images/bgs/L-Kerning City.jpg", sidebarColour: "#2d2b25" },
  { high: "images/bgs/Perion.jpg", low: "images/bgs/L-Perion.jpg", sidebarColour: "#af8962" },
  { high: "images/bgs/Elodin.jpg", low: "images/bgs/L-Elodin.jpg", sidebarColour: "#d7b312" },
  { high: "images/bgs/Eos Tower.jpg", low: "images/bgs/L-Eos Tower.jpg", sidebarColour: "#d59309" },
  { high: "images/bgs/Temple of Time.jpg", low: "images/bgs/L-Temple of Time.jpg", sidebarColour: "#97d9a1" },
  { high: "images/bgs/Reverse City.jpg", low: "images/bgs/L-Reverse City.jpg", sidebarColour: "#121212" },
]

interface IBackdropIndexContext {
  index: number,
  setIndex: Function
}

export const BackdropIndexContext = createContext<IBackdropIndexContext>({
  index: 0,
  setIndex: () => { }
});

const Backdrop: React.FC<IProps> = ({ children, backdropIndex }: IProps) => {

  const [index, setIndex] = useState<number>(0);

  return (
    <motion.div>
      <motion.div>
        <motion.img
          className="backdrop"
          src={BackdropImages[index].high}
          initial={{ opacity: 1 }}
        />
      </motion.div>
      <BackdropIndexContext.Provider value={{ index, setIndex }}>
        {children}
      </BackdropIndexContext.Provider>
    </motion.div>
  );
}

export default Backdrop;
