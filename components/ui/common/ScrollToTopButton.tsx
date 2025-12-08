"use client";

import { Button } from "@/components/ui/button";

export default function ScrollToTopButton() {
  return (
    <Button
      variant="secondary"
      className="fixed top-18 right-12 z-50 cursor-pointer shadow"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      type="button"
    >
      ↑ Góraa
    </Button>
  );
}
