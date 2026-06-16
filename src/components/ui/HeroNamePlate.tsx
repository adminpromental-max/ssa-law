import Image from "next/image";

export function HeroNamePlate() {
  return (
    <h1 className="m-0 w-full flex justify-center">
      <Image
        src="/images/name-plate-hero.png"
        alt="مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية والتوثيق"
        width={1075}
        height={565}
        priority
        className="w-full max-w-[240px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[400px] h-auto object-contain mx-auto"
      />
    </h1>
  );
}
