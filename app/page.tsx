"use client";
import { Typewriter } from "react-simple-typewriter";
import logo from "./assests/logo.png";
import Image from "next/image";
import GetStart from "./components/getStart";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-4 justify-center items-center h-[90vh] lg:text-3xl md:text-xl font-bold relative">
        <Image src={logo} alt="Harmoni.AI" width={100} height={100} />

        <span className="shining-text">
          <Typewriter
            words={["Hey there, Harmoni here"]}
            loop={1}
            typeSpeed={100}
          />
        </span>
        <GetStart />
      </div>
    </div>
  );
}
