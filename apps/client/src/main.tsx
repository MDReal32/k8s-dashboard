import { createRoot } from "react-dom/client";

import "@total-typescript/ts-reset";

import { App } from "./app";

import "./core.css";

createRoot(document.getElementById("root")!).render(<App />);
