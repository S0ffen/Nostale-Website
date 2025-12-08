"use client";

import { Button } from "@/components/ui/button";

export default function CategoryNav({ categories }: { categories: string[] }) {
  return (
    <div className="flex gap-4 justify-center">
      {categories.map((category) => (
        <Button
          key={category}
          variant="secondary"
          className="cursor-pointer"
          type="button"
          onClick={() =>
            document
              .getElementById(category.toLowerCase())
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
