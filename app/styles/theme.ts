// Theme utility classes for consistent theming across the application

export const themeClasses = {
  // Background classes
  bg: {
    primary: "bg-gray-800/70 dark:bg-gray-800/70 light:bg-white",
    secondary: "bg-gray-700/30 dark:bg-gray-700/30 light:bg-gray-50",
    hover:
      "hover:bg-gray-700/30 dark:hover:bg-gray-700/30 light:hover:bg-gray-100",
    input: "bg-gray-700/50 dark:bg-gray-700/50 light:bg-white",
    gradient:
      "bg-gradient-to-r from-[#432c52] via-[#2a3b36] to-[#432c52] dark:from-[#432c52] dark:via-[#2a3b36] dark:to-[#432c52] light:from-gray-50 light:via-gray-100 light:to-gray-50",
  },

  // Border classes
  border: {
    primary: "border-gray-700 dark:border-gray-700 light:border-gray-200",
    secondary: "border-gray-600 dark:border-gray-600 light:border-gray-300",
    focus: "focus:border-blue-500",
  },

  // Text classes
  text: {
    primary: "text-white dark:text-white light:text-gray-900",
    secondary: "text-gray-300 dark:text-gray-300 light:text-gray-700",
    tertiary: "text-gray-400 dark:text-gray-400 light:text-gray-500",
    muted: "text-gray-500 dark:text-gray-500 light:text-gray-400",
  },

  // Card classes
  card: "bg-gray-800/70 dark:bg-gray-800/70 light:bg-white backdrop-blur-md rounded-lg shadow-sm border border-gray-700 dark:border-gray-700 light:border-gray-200",

  // Button classes
  button: {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-gray-600/20 dark:bg-gray-600/20 light:bg-gray-100 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-gray-600/30 dark:hover:bg-gray-600/30 light:hover:bg-gray-200",
  },
};

export const getThemeClass = (key: string): string => {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = themeClasses;

  for (const k of keys) {
    value = value[k];
    if (!value) return "";
  }

  return typeof value === "string" ? value : "";
};
