// Quick theme update script - run this to update all white backgrounds to dark theme

const replacements = [
  // White cards to dark cards
  {
    from: "bg-white rounded-lg shadow-sm border border-gray-200",
    to: "bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700",
  },

  // Text colors
  { from: "text-gray-900", to: "text-white" },
  { from: "text-gray-600", to: "text-gray-300" },
  { from: "text-gray-500", to: "text-gray-400" },

  // Borders
  { from: "border-gray-200", to: "border-gray-700" },
  { from: "divide-gray-200", to: "divide-gray-700" },

  // Backgrounds
  { from: "bg-gray-50", to: "bg-gray-700/50" },
  { from: "hover:bg-gray-50", to: "hover:bg-gray-700/30" },
  { from: "bg-gray-100", to: "bg-gray-800" },

  // Form elements
  {
    from: "border-gray-300 bg-white",
    to: "border-gray-600 bg-gray-700/50 text-white",
  },
  {
    from: "border-gray-300 bg-gray-50",
    to: "border-gray-600 bg-gray-700/50 text-white placeholder-gray-400",
  },
];

console.log("Theme replacement patterns ready. Apply manually to each page.");
console.log(replacements);
