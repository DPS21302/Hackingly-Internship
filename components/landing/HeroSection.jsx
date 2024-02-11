"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import PrimaryNavbar from "../layout/PrimaryNavbar";
import Image from "next/image";
import MaskImg from "@/assets/images/mask-ill2.webp";
import Mask from "@/assets/images/mask-ill.webp";
import HeaderImg from "@/assets/images/header-image.webp";
import LaptopImg from "@/assets/images/Laptop.webp";

const HeroSection = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {" "}
      {/* <div
        className={`z-50 fixed min-w-full py-2 ${
          isScrolled ? "bg-[#5243b6]" : "bg-transparent text-current"
        }`}
      >
        <PrimaryNavbar />
      </div> */}
      <div className="h-fit md:h-[100vh] pt-20 relative overflow-hidden">
        {/* Background image */}

        <Image
          src={MaskImg}
          width={500}
          height={500}
          alt=""
          className="absolute -right-10 opacity-30 h-auto w-auto top-1/2 transform -translate-y-1/2"
        />

        <div className="absolute inset-0 w-full h-full  bg-primary -z-[9]  opacity-[80%]"></div>
        <Image
          src={HeaderImg}
          width={1920}
          height={1080}
          alt=""
          className="block absolute inset-0 w-full h-full brightness-50 contrast-125 object-cover -z-10 select-none"
        />

        {/* Content */}
        <div className="flex flex-col mt-10 md:flex-row justify-between items-center h-fit md:h-[100%] layoutBox">
          <div className="md:pr-20  flex-1 z-10  md:mt-[-10rem] sm:mt-[0rem] relative">
            <Image
              src={Mask}
              width={600}
              height={600}
              alt=""
              className="absolute bottom-10 -left-20 -z-10 opacity-50 h-auto w-auto"
            />

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center md:text-left  font-semibold my-5 text-white">
              Connecting you to <br /> your dream career
            </h1>
            <h3 className="text-base md:text-lg text-center md:text-left text-white">
              Empowering Minds with Technology - Dive into the Hackathon
              Revolution at Hackingly! Your Gateway to Innovation and
              Excitement.
            </h3>
            <div className="my-4 flex flex-row gap-3 justify-center md:justify-start">
              <Button
                onClick={() => router.push("/events")}
                variant="solid"
                className="text-white text-sm sm:text-base md:text-lg w-fit bg-gradient-to-r from-[#ff4721] to-[#ffa52b]"
              >
                Explore Events
              </Button>
              <Button
                onClick={() => router.push("/organize-event")}
                variant="ghost"
                className="text-white hover:text-primary text-sm sm:text-base md:text-lg w-fit"
              >
                Organize Events
              </Button>
            </div>
          </div>
          {/* Hero image */}
          <div className="z-10 py-10 md:py-0 md:w-1/2">
            <Image src={LaptopImg} alt="" className="w-[600px] md:w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
