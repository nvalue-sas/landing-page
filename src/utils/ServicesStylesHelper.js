// Helper function to get the color class based on the color name

export const getColorClass = (colorName) => {
  const baseTransition = "transition-all duration-300";

  switch (colorName) {
    case "primary":
      return `${baseTransition} bg-primary-200/10 text-cyan-600 border-cyan-300/60 dark:bg-transparent dark:border-secondary-100/20 dark:hover:border-cyan-400/60 dark:hover:bg-cyan-400/5 dark:hover:scale-[1.02]`;
    case "secondary":
      return `${baseTransition} bg-teal-100/10 text-teal-600 border-teal-300/60 dark:bg-transparent dark:border-secondary-100/20 dark:hover:border-teal-400/60 dark:hover:bg-teal-400/5 dark:hover:scale-[1.02]`;
    case "accent":
      return `${baseTransition} bg-pink-100/10 text-pink-600 border-pink-300/60 dark:bg-transparent dark:border-secondary-100/20 dark:hover:border-pink-400/60 dark:hover:bg-pink-400/5 dark:hover:scale-[1.02]`;
    default:
      return `${baseTransition} bg-gray-50 text-gray-600 border-gray-100`;
  }
};
