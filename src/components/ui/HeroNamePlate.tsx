import Image from "next/image";

export function HeroNamePlate() {
  return (
    <h1 className="m-0 w-full flex justify-center lg:justify-start">
      <Image
        src="/images/name-plate-hero.png"
        alt="مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية والتوثيق"
        width={1075}
        height={565}
        priority
        className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] xl:max-w-[520px] h-auto object-contain"
      />
    </h1>
  );
}
