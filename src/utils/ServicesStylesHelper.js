// Helper function to get the color class based on the color name

export const getColorClass = (colorName) => {
  switch (colorName) {
    case "primary":
      return "bg-primary-200/10 text-cyan-600 border-cyan-300/60 dark:bg-transparent dark:border-secondary-100/20";
    case "secondary":
      return "bg-teal-100/10 text-teal-600 border-teal-300/60 dark:bg-transparent dark:border-secondary-100/20";
    case "accent":
      return "bg-pink-100/10 text-pink-600 border-pink-300/60 dark:bg-transparent dark:border-secondary-100/20";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};
