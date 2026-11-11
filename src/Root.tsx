import { StrictMode } from "react";
import App from "./App";
import { RouterProvider } from "@/lib/router";
import { LocaleProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { SmoothScroll } from "@/lib/scroll";

export function Root({ url }: { url: string }) {
  return (
    <StrictMode>
      <RouterProvider initialPath={url}>
        <ThemeProvider>
          <LocaleProvider>
            <SmoothScroll>
              <App />
            </SmoothScroll>
          </LocaleProvider>
        </ThemeProvider>
      </RouterProvider>
    </StrictMode>
  );
}
