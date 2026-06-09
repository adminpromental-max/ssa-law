import Image from "next/image";

export function HeroNamePlate() {
  return (
    <h1 className="m-0">
      <Image
        src="/images/name-plate-hero.png"
        alt="مكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية والتوثيق"
        width={1075}
        height={565}
        priority
        className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[480px] xl:max-w-[540px] h-auto object-contain mx-auto lg:mx-0 lg:mr-auto"
      />
    </h1>
  );
}
