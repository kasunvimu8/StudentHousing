import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px] mb-6">
      <Image
        src="/images/hero.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-[-1] rounded-lg"
      />
      <div
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-gray-100
       rounded-lg"
      >
        <h1 className="text-2xl md:text-4xl font-bold">
          Welcome to Student Housing
        </h1>
        <p className="mt-4 font-bold text-lg md:text-3xl">in Burghausen</p>
      </div>
    </div>
  );
};

export default Hero;
