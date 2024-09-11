import Image from "next/image";
import { Badge } from "@/components/ui/batch";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] mb-6">
      <Image
        src="/images/background.jpg"
        alt="Hero Image"
        fill={true}
        quality={100}
        className="z-[-1] rounded-lg object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-end justify-start gap-4 text-right p-5 rounded-lg text-gray-600">
        <h1 className="text-2xl md:text-4xl font-bold">
          Welcome to Student Housing
        </h1>
        <p className="font-bold text-lg md:text-3xl">in Burghausen</p>
        <p className="font-light text-sm md:text-lg">
          Find and reserve your perfect student home, just a click away.
        </p>
        <div className="flex justify-end gap-2">
          <Link href="/contacts">
            <Badge variant="outline">Contact Us</Badge>
          </Link>
          <Link href="/information">
            <Badge
              variant="outline"
              className="highlight-background-color text-white"
            >
              Information
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
