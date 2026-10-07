import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "@primereact/core";
import Aura from "@primeuix/themes/aura";
import App from "./App.tsx";
import "./index.css";

const primereact = {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark", // none, system,
      cssVariables: true,
    },
  },
  license:
    "eyJpZCI6IjcyNDJlNzdjLTEwMDEtNDA1MC04NTEyLTZmZTQwMDM3ODdlZiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTA5NzAyNjksImV4cCI6MTgyMjUwNjI2OX0.vor8YEnYBlKmx5WD8C1Qajmqnv6n9j_-jXwdXocb4kfVZfo357Lr3j6rXwklbIpxPmbDfEnUFIDlN8TBn0zKBA",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider {...primereact}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
