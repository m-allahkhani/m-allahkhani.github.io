"use strict";

/* Mobile navigation */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) setMenu(false);
  });
}

/* Light / dark theme */
const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const THEME_COLORS = { light: "#f6f6f3", dark: "#0b0f2b" };

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  if (themeMeta) themeMeta.setAttribute("content", THEME_COLORS[theme]);
  if (themeButton) {
    const dark = theme === "dark";
    themeButton.setAttribute("aria-pressed", String(dark));
    themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeButton.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
  }
};

const storedTheme = () => {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
};

applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

/* Follow the system setting until the visitor chooses a theme manually */
const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");
const onSystemChange = (event) => {
  if (!storedTheme()) applyTheme(event.matches ? "dark" : "light");
};
if (systemQuery.addEventListener) systemQuery.addEventListener("change", onSystemChange);
else if (systemQuery.addListener) systemQuery.addListener(onSystemChange);

/* Footer year */
const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
