import data from "../public/upanie.json";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/ui/common/ScrollToTopButton";
import CategoryNav from "@/components/ui/common/CategoryNav";

type Entry = {
  image?: string;
  [level: string]: number | string | undefined;
};

type SpecialistsByCharacter = Record<string, Record<string, Entry>>;
type TattosByCharacter = Record<string, Entry>;
type FairyByCharacter = Record<string, Record<string, Entry>>;
type EquipmentByCharacter = Record<string, Record<string, Entry>>;

export default function HomePage() {
  const categories = Object.keys(data); // np. ["Equipment","Specialists","Fairy","Tattos"]

  const specialists = data.Specialists as SpecialistsByCharacter;
  const tattos = data.Tattos as TattosByCharacter;
  const fairy = data.Fairy as FairyByCharacter;
  const equipment = data.Equipment as EquipmentByCharacter;

  console.log("specialists", specialists);
  console.log("tattos", tattos);
  console.log("data", data);
  console.log(categories);

  //"Holy": { "image": "/Holy.png", "16": 185, "17": 11, "18": 22, "19": 14, "20": 325 }
  // name: string to będzie klucz obiektu, czyli tutaj "Holy"
  //info: Entry to będzie wartość pod tym kluczem, czyli cały obiekt: image,16,17,18,19,20
  const renderEntryCard = (name: string, info: Entry) => {
    const { image, ...rest } = info;

    // bierzemy tylko level -> number, ignorujemy image i ewentualne inne stringi
    const levels = Object.entries(rest).filter(
      ([, value]) => typeof value === "number"
    ) as [string, number][];

    return (
      <Card
        key={name}
        className="bg-neutral-900 border-neutral-800 text-neutral-100 w-full max-w-xs transition-transform duration-300 hover:-translate-y-5"
      >
        <CardHeader className="p-3">
          {image && (
            <div className="mb-2 overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={name}
                width={400}
                height={220}
                className="h-100 w-full object-cover"
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
  };

  return (
    <div className="min-h-screen text-neutral-100 bg-linear-to-bl from-[#0D0A07] via-[#1A120B] to-[#0A0705]">
      {/* NAVBAR */}
      <header className="border-b border-neutral-800">
        <nav className="h-16 flex items-center justify-between px-6">
          <span className="text-lg font-semibold">Soffen</span>
          <div className="flex gap-4 text-sm text-neutral-300">
            <a href="#" className="hover:text-white">
              Nostale
            </a>
            <a href="#" className="hover:text-white">
              About
            </a>
          </div>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="px-6 py-8">
        <ScrollToTopButton />
        <div className="w-7/12 mx-auto space-y-10">
          <h1 className="text-3xl font-semibold text-center">
            Nostale progress
          </h1>
          <div className="flex gap-4 justify-center">
            <CategoryNav categories={categories} />
          </div>
          {/* EQUIPMENT */}
          <section className="space-y-6" id="equipment">
            <h2 className="text-2xl font-semibold">Equipment</h2>
            {Object.entries(equipment).map(([characterName, eq]) => (
              <div key={characterName} className="space-y-3">
                <h3
                  className="
                    text-4xl font-extrabold
                    text-transparent bg-clip-text
                    bg-linear-to-r from-fuchsia-400 via-rose-500 to-amber-400
                    animate-gradient-x
                    drop-shadow-[0_0_10px_rgba(255,100,200,0.5)]
                    text-center mb-6
                  "
                >
                  {characterName}
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {Object.entries(eq).map(([specName, info]) =>
                    renderEntryCard(specName, info)
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* SPECIALISTS */}
          <section className="space-y-6" id="specialists">
            <h2 className="text-2xl font-semibold">Specialists</h2>
            {Object.entries(specialists).map(([characterName, specs]) => (
              <div key={characterName} className="space-y-3">
                <h3
                  className="
                    text-4xl font-extrabold
                    text-transparent bg-clip-text
                    bg-linear-to-r from-fuchsia-400 via-rose-500 to-amber-400
                    animate-gradient-x
                    drop-shadow-[0_0_10px_rgba(255,100,200,0.5)]
                    text-center mb-6
                  "
                >
                  {characterName}
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {Object.entries(specs).map(([specName, info]) =>
                    renderEntryCard(specName, info)
                  )}
                </div>
              </div>
            ))}
          </section>
          {/* FAIRIES */}
          <section className="space-y-6" id="fairy">
            <h2 className="text-2xl font-semibold">Specialists</h2>
            {Object.entries(fairy).map(([characterName, specs]) => (
              <div key={characterName} className="space-y-3">
                <h3
                  className="
                    text-4xl font-extrabold
                    text-transparent bg-clip-text
                    bg-linear-to-r from-fuchsia-400 via-rose-500 to-amber-400
                    animate-gradient-x
                    drop-shadow-[0_0_10px_rgba(255,100,200,0.5)]
                    text-center mb-6
                  "
                >
                  {characterName}
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {Object.entries(specs).map(([specName, info]) =>
                    renderEntryCard(specName, info)
                  )}
                </div>
              </div>
            ))}
          </section>
          {/* TATTOS */}
          <section className="space-y-6" id="tattos">
            <h2 className="text-2xl font-semibold">Tattos</h2>

            {Object.entries(tattos).map(([characterName, entry]) => (
              <div key={characterName} className="space-y-3">
                <h3
                  className="
                  text-4xl font-extrabold
                  text-transparent bg-clip-text
                  bg-linear-to-r from-fuchsia-400 via-rose-500 to-amber-400
                  animate-gradient-x
                  drop-shadow-[0_0_10px_rgba(255,100,200,0.5)]
                  text-center mb-6
                "
                >
                  {characterName}
                </h3>

                <div className="flex flex-wrap gap-4 justify-center">
                  {renderEntryCard("Tatto", entry)}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
