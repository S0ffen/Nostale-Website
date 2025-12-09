// components/EntryCard.tsx
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type Entry = {
  image?: string;
  [level: string]: number | string | undefined;
};

type Props = {
  name: string;
  info: Entry;
  className?: string; // opcjonalnie do Equipment
};

export default function EntryCard({ name, info, className = "" }: Props) {
  const { image, ...rest } = info;

  const levels = Object.entries(rest).filter(
    ([, value]) => typeof value === "number"
  ) as [string, number][];

  return (
    <Card
      className={[
        "bg-neutral-900 border-neutral-800 text-neutral-100 w-1/4 h-full transition-transform duration-300",
        className,
      ].join(" ")}
    >
      <CardHeader className="p-3">
        {image && (
          <div className="mb-2 overflow-hidden rounded-xl bg-black/30 w-full">
            <Image
              src={image}
              alt={name}
              height={450}
              width={350}
              className="object-contain"
            />
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
  );
}
