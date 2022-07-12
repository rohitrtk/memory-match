import React from "react";
import { motion } from "framer-motion";
import { ButtonVariants as Variants } from "./ButtonVariants";

import "./Button.css";

declare interface IProps {
  text: string,
  started: boolean,
  onClick?: Function
}

const variants = Variants;

const Button = (props: IProps) => {
  const { text, onClick, started } = props;
  
  return(
    <motion.button 
        onClick={() => onClick ? onClick() : null}
        whileHover={{scale: 1.1}}
        variants={variants}
        animate={[!started ? "bounce" : "still"]}
      >
        {text}
      </motion.button>
  );
}

export default Button;