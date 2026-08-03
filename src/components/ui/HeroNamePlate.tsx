import Image from "next/image";

interface HeroNamePlateProps {
  align?: "center" | "end";
}

export function HeroNamePlate({ align = "center" }: HeroNamePlateProps) {
  const justify =
    align === "end" ? "justify-center lg:justify-end" : "justify-center";

  return (
    <h1 className={`m-0 w-full flex ${justify}`}>
      <Image
        src="/images/name-plate-hero.png"
        alt="مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية والتوثيق"
        width={1075}
        height={565}
        priority
        className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[460px] h-auto object-contain"
      />
    </h1>
  );
}
