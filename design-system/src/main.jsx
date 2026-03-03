import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BrandTemplate from "./BrandTemplate";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrandTemplate />
  </StrictMode>
);
