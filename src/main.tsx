import "@mantine/core/styles.css";
import "easymde/dist/easymde.min.css";
import { registerSW } from "virtual:pwa-register";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./app/App";
import { AuthProvider } from "./features/auth/AuthProvider";

registerSW({ immediate: true });
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>,
);
