// components/ContentCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type Entry = {
  image?: string;
  [level: string]: number | string | undefined;
};

type ContentCardProps = {
  name: string;
  info: Entry;
  className?: string;
};

export default function ContentCard({
  name,
  info,
  className = "",
}: ContentCardProps) {
  const [open, setOpen] = useState(false);

  const { image, ...rest } = info;

  const levels = Object.entries(rest).filter(
    ([, value]) => typeof value === "number"
  ) as [string, number][];

  return (
    <>
      <Card
        className={[
          "bg-neutral-900 border-neutral-800 text-neutral-100 w-1/5 transition-transform duration-300 hover:-translate-y-5",
          className,
        ].join(" ")}
      >
        <CardHeader className="p-3">
          {image && (
            <div className="relative mb-2 overflow-hidden rounded-xl">
              {/* klik w obrazek otwiera modal */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="block w-full"
                aria-label={`Powiększ ${name}`}
              >
                <Image
                  src={image}
                  alt={name}
                  width={400}
                  height={220}
                  className="w-full h-[400px] object-cover"
                />
              </button>

              {/* mały przycisk w prawym górnym rogu */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="absolute top-2 right-2 z-10 rounded-md bg-black/60 px-2 py-1 text-xs text-white hover:bg-black/80"
                aria-label={`Powiększ ${name}`}
              >
                ⤢
              </button>
            </div>
          )}

          <CardTitle className="text-lg text-center">{name}</CardTitle>
        </CardHeader>

        <CardContent className="px-3 pb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-neutral-400">
                <th className="text-left">Level</th>
                <th className="text-left">Próby</th>
              </tr>
            </thead>
            <tbody>
              {levels.map(([level, tries]) => (
                <tr key={level}>
                  <td>{level}</td>
                  <td>{tries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* MODAL */}
      {open && image && (
        <div
          className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 rounded-md bg-black/60 px-3 py-1 text-sm text-white hover:bg-black/80"
            >
              Zamknij ✕
            </button>

            <div className="relative w-full aspect-4/3 bg-black rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="mt-3 text-center text-white/90 font-semibold">
              {name}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
