import { useEffect } from "react";
import { useTheme } from "../theme/ThemeContext"; // Assuming you have this context to provide the theme

const baseURL =
  "https://raw.githubusercontent.com/atlemo/SubtlePatterns/refs/heads/gh-pages/";

// Define separate image arrays for light and dark themes
const lightImages = [
  "connect.png",
  "light_wool.png",
  "batthern.png",
  "cardboard_1.png",
  "white_brick_wall.png",
  "paven.png",
  "gplaypattern.png",
  "geometry.png",
];

const darkImages = [
  "cartographer.png",
  "black_mamba.png",
  "black_scales.png",
  "black_twill.png",
  "dark_brick_wall.png",
  "dark_mosaic.png",
  "subtle_carbon.png",
  "woven.png",
];

// Custom hook for setting random background
export function useRandomBackground() {
  const { theme } = useTheme();

  useEffect(() => {
    // Select images based on the theme
    let selectedImages = theme === "black" ? darkImages : lightImages;

    // Pick a random image
    const randomImage =
      selectedImages[Math.floor(Math.random() * selectedImages.length)];

    // Set the background image
    document.body.style.backgroundImage = `url('${baseURL}${randomImage}')`;
  }, [theme]); // Runs whenever the theme changes
}
