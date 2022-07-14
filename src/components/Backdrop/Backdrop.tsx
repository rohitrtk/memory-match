import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Backdrop.css";

declare interface IProps {
  children?: ReactNode,
  backdropIndex?: number
}

export const BackdropImages = [
  "images/bgs/Maple Island.jpg",
  "images/bgs/Elinia.jpg",
  "images/bgs/Kerning City.jpg",
  "images/bgs/Perion.jpg",
  "images/bgs/Elodin.jpg",
  "images/bgs/Eos Tower.jpg",
  "images/bgs/Temple of Time.jpg",
  "images/bgs/Reverse City.jpg"
]

const Backdrop: React.FC<IProps> = ({ children, backdropIndex }: IProps) => {

  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    setIndex((!backdropIndex || backdropIndex >= BackdropImages.length)
      ? Math.floor(Math.random() * BackdropImages.length)
      : backdropIndex
    );
  }, [backdropIndex]);

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div>
          <motion.img
            className="backdrop"
            src={BackdropImages[1]}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
          />
        </motion.div>
      </AnimatePresence>
      {children}
    </motion.div >
  );
}

export default Backdrop;
