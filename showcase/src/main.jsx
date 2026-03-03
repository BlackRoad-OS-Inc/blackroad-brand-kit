import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ColorTest from "./ColorTest";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorTest />
  </StrictMode>
);
