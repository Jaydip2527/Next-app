export const getNameInitials = (name: string) => {
  if (!name) {
    return "";
  }

  const words = name.trim().split(" ");
  const firstInitial = words[0]?.[0]?.toUpperCase() || "";
  const lastInitial =
    words.length > 1 ? words[words.length - 1][0]?.toUpperCase() : "";

  return firstInitial + lastInitial;
};

export const generateTaskId = () => {
  return `TASK${Math.floor(1000 + Math.random() * 9000)}`; // Generates TASK1234 format
};

export const generateLeadId = () => {
  return `LEAD${Math.floor(1000 + Math.random() * 9000)}`; // Generates TASK1234 format
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }
  return null;
};

export const getCurrentAddress = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("curAddress") || sessionStorage.getItem("curAddress")
    );
  }
  return null;
};

export const priorityColors = [
  {
    label: "High",
    value: "high",
    color: "#E63946",
    icon: "material-symbols:keyboard-double-arrow-up",
  }, // Red Up Arrow
  {
    label: "Medium",
    value: "medium",
    color: "#FF9F1C",
    icon: "solar:hamburger-menu-bold",
  }, // Yellow Equal Bars
  {
    label: "Low",
    value: "low",
    color: "#0B3D91",
    icon: "material-symbols:keyboard-double-arrow-down",
  }, // Blue Down Arrow
];

export const getRandomColor = () => {
  const colors = [
    "#FF5733", // Dark Red
    "#C70039", // Dark Maroon
    "#900C3F", // Deep Purple
    "#581845", // Dark Violet
    "#1D3557", // Deep Blue
    "#0B3D91", // Navy Blue
    "#264653", // Dark Teal
    "#6A0572", // Dark Magenta
    "#FF9F1C", // Vibrant Orange
    "#2EC4B6", // Bright Cyan
    "#E63946", // Bold Coral
    "#457B9D", // Steel Blue
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getTransparentLightBackground = (color: string, opacity = 0.2) => {
  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(color);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`; // Set light transparent background
};
