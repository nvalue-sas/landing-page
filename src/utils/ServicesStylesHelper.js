// Helper function to get the color class based on the color name

export const getColorClass = (colorName) => {
  switch (colorName) {
    case "primary":
      return "bg-primary-400/10 text-primary-600 border-primary-300/60 dark:bg-transparent dark:border-secondary-100/20";
    case "secondary":
      return "bg-teal-400/10 text-teal-600 border-teal-300/60 dark:bg-transparent dark:border-secondary-100/20";
    case "accent":
      return "bg-pink-400/10 text-pink-600 border-pink-300/60 dark:bg-transparent dark:border-secondary-100/20";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};
