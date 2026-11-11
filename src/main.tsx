import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";
import { Root } from "./Root";
import { initAnalytics } from "@/lib/analytics";

const container = document.getElementById("root")!;
const app = <Root url={location.pathname} />;

// Pre-rendered pages are hydrated; the dev server serves an empty shell.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);

void initAnalytics();
