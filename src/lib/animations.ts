export const containerAnimation = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02 * i,
    },
  }),
};

export const childAnimation = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
      duration: 0.2,
    },
  },
};
