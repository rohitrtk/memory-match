export const CardVariants = {
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
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
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
