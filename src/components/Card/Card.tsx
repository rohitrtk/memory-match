import { motion } from "framer-motion";

import "./Card.css";

export interface ICard {
  src: string;
  matched: boolean;
  id?: number;
}

declare interface IProps {
  card: ICard;
  handleChoice?: Function;
  playAudio?: Function;
  flipped?: boolean;
  disabled?: boolean;
}

const variants = {
  front: {
    rotateY: 90,
    transition: {
      ease: "easeIn",
      duration: 0.4,
      delay: 0.2
    }
  },
  back: {
    rotateY: 0,
    transition: {
      ease: "easeIn",
      duration: 0.4,
      delay: 0.2
    }
  },
  maxScale: {
    scale: 1.1,
    transition: {
      duration: 0.1
    }
  },
  minScale: {
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  noScale: {
    scale: 0
  }
}

const Card = (props: IProps) => {
  const { handleChoice, playAudio, flipped, card, disabled } = props;
  const { src, id } = card;

  const handleClick = () => {
    if (!disabled && handleChoice) handleChoice(card);
  }

  const backToFront = () => {
    if (playAudio) playAudio();
  }

  return (
    <div className="card" key={id}>
      <div>
        <motion.img
          className="card-front"
          src={src}
          alt="Card Front"
          variants={variants}
          animate={[flipped ? "back" : "front"]}
          initial={["front"]}
          onAnimationComplete={backToFront}
        />
        <motion.img
          className="card-back"
          src="/images/leaf.png"
          alt="Card Back"
          whileHover={{ scale: 1.1 }}
          variants={variants}
          animate={[flipped ? "front" : "back", "minScale"]}
          initial={["noScale"]}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Card;

export const Images = [
  { src: "/images/mercedes.png", matched: false },
  { src: "/images/aran.png", matched: false },
  { src: "/images/phantom.png", matched: false },
  { src: "/images/lumi.png", matched: false },
  { src: "/images/evan.png", matched: false },
  { src: "/images/shroom.png", matched: false },
  { src: "/images/slime.png", matched: false },
  { src: "/images/pig.png", matched: false }
];

export const Audio = {
  loaded: "/audio/loaded.mp3",
  complete: "/audio/complete.mp3",
  correct: "/audio/correct.mp3",
  incorrect: "/audio/incorrect.mp3"
};
