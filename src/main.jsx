import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BlackRoadTemplates from "./BlackRoadTemplates";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlackRoadTemplates />
  </StrictMode>
);
