"use client";

import { useEffect } from "react";

export default function MenuOutsideClose() {
  useEffect(() => {
    const toggle = document.getElementById("nav-toggle");
    const header = document.querySelector(".site-header");

    if (!(toggle instanceof HTMLInputElement) || !header) {
      return;
    }

    const closeMenu = () => {
      if (!toggle.checked) {
        return;
      }

      toggle.checked = false;
      toggle.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const handlePointerDown = (event) => {
      if (!toggle.checked) {
        return;
      }

      if (event.target instanceof Node && header.contains(event.target)) {
        return;
      }

      closeMenu();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 980) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}
