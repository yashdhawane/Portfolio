import memojiImage from "../assets/images/memoji-computer.png";
import Image from "next/image";
import ArrowDown from "../assets/icons/arrow-down.svg";
export const HeroSection = () => {
  return (
  <>
  <div className="py-32">
    <div className="container">
      <div className="flex flex-col items-center">
      <Image src={memojiImage} className="size-[100px]" alt="Person peeking from behind laptop"/>
      <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
      <div className="bg-green-500 rounded-full size-2.5 relative"></div>
        <div className="text-sm font-medium">
              Available for new projects
            </div>
      </div>
      <h1 className="font-serif text-3xl text-center mt-8 tracking-wide">Building</h1>
      <p className="mt-4 text-center text-white/60">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, facilis tempore porro ut, excepturi quia voluptates voluptas optio adipisci delectus eveniet vel, laborum possimus sequi inventore odio officia omnis soluta!</p>
      <div className="flex flex-col items-center mt-8">
        <button className="inline-flex items-center gap-2 border border-white/15 px-6 h-12">
          <span>Explore</span>
          <ArrowDown className="size-4"/>
        </button>
        <button>
          <span>👋</span>
          <span>Get in touch</span>
        </button>
      </div>
    </div>
  </div>
  </div>
  </>
  );
};
