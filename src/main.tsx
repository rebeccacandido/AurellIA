
  import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StudentProvider } from "./context/StudentContext";

createRoot(document.getElementById("root")!).render(
  <StudentProvider>
    <App />
  </StudentProvider>
);
  
