import React from "react";
import { createRoot } from "react-dom/client";
import { Routers } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style/global.css";
import { Modal } from "@/components/common/modal/Modal.tsx";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Modal />
      <Routers />
    </QueryClientProvider>
  </React.StrictMode>,
);
