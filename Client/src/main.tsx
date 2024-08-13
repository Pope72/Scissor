import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UseSession from "./hooks/useSession.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UseSession>
      <App />
      <Toaster />
    </UseSession>
  </StrictMode>
);
