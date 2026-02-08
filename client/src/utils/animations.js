export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10 }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 }
  }),
  hover: { y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }
};

export const buttonClick = {
  tap: { scale: 0.95 }
};
