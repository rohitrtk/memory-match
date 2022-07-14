import { motion } from "framer-motion";
import "./Button.css";

declare interface IProps {
  text: string,
  started: boolean,
  onClick?: Function
}

const variants = {
  bounce: {
    scale: [0.8, 1.2, 0.8],
    transition: {
      ease: "easeInOut",
      repeat: Infinity,
      duration: 3
    }
  },
  still: {
    scale: 1
  }
};

const Button = (props: IProps) => {
  const { text, onClick, started } = props;

  return (
    <motion.button
      onClick={() => onClick ? onClick() : null}
      whileHover={{ scale: 1.1 }}
      variants={variants}
      animate={[!started ? "bounce" : "still"]}
    >
      {text}
    </motion.button>
  );
}

export default Button;