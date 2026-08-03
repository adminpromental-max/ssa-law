import Image from "next/image";

interface HeroNamePlateProps {
  align?: "center" | "end";
  compact?: boolean;
}

export function HeroNamePlate({
  align = "center",
  compact = false,
}: HeroNamePlateProps) {
  const justify =
    align === "end" ? "justify-center lg:justify-end" : "justify-center";

  const sizeClass = compact
    ? "max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px]"
    : "max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[460px]";

  return (
    <h1 className={`m-0 w-full flex ${justify}`}>
      <Image
        src="/images/name-plate-hero.png"
        alt="مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية والتوثيق"
        width={1075}
        height={565}
        priority
        className={`w-full ${sizeClass} h-auto object-contain`}
      />
    </h1>
  );
}
