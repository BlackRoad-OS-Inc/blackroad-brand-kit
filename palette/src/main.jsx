import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BlackRoadPalette from "./BlackRoadPalette";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlackRoadPalette />
  </StrictMode>
);
