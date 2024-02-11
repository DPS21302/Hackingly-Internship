"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import FormTabs from "../FormTabs";
import Image from "next/image";
import MaskGroup from "@/assets/images/Maskgroup.webp";
import LaptopImg from "@/assets/images/laptoplayer.webp";
import PhoneGraphic from "@/assets/images/phonegraphic.webp";
const OrganizeEventForm = () => {
  return (
    <>
      <div className=" h-fit pt-20 md:h-screen relative overflow-hidden w-[100%]">
      
        <div className="sm:hidden absolute inset-0 w-full h-full bg-primary -z-[9] "></div>
        <Image
          src={MaskGroup}
          width={1920}
          height={1080}
          className=" absolute inset-0 w-full h-[55rem]  bg-cover -z-10 select-none"
          alt=""
        />

        {/* Content */}
        <div className="flex flex-col pt-32 md:flex-row justify-between mt-0 items-center h-fit md:h-[100%] layoutBox">
          <div className="md:pr-20  flex-1 z-10  md:mt-[-10rem] sm:mt-[0rem]">
            <h1 className="text-3xl text-white text-center md:text-6xl md:text-left font-medium md:leading-[4rem]">
              Organize your next <br /> hackathon with ease!
            </h1>
            <h3 className="text-base md:text-lg text-center md:text-left text-white">
              Empower innovation, foster collaboration, and make your vision a
              reality.
            </h3>
            <Link
              href="#organize-form"
              className="my-4 flex flex-row gap-3 justify-center md:justify-start"
            >
              <Button
                size="lg"
                color="primary"
                className="my-2 w-fit"
                style={{
                  color: "white",
                  background: "linear-gradient(to right,#ff4721 , #ffa52b)",
                }}
              >
                Organize Hackathon
              </Button>
            </Link>
          </div>

          <div className="z-10 ">
            <Image
              src={LaptopImg}
              loading="lazy"
              alt=""
              // width={80}
              // height={20}
              className="hidden md:block md:max-w-[35rem] md:max-h-[35rem] object-contain"
            />
          </div>
        </div>
      </div>

      <div className=" my-10 p-3 md:p-7 grid md:grid-cols-2 grid-cols-1 gap-10 layoutBox items-center justify-center">
        <div className=" hidden md:block p-1 items-center justify-center mx-auto">
          <Image
            src={PhoneGraphic}
            alt=""
            loading="lazy"
            width={70}
            height={70}
            className="h-[10rem] w-[80rem] md:h-[35rem] md:w-[30rem]"
          />
        </div>

        <div className="p-1 grid grid-cols-1 items-center justify-center">
          <h3 className="text-xl md:text-4xl text-center font-bold mb-3">
            A Bit About{" "}
            <span className=" font-semibold md:font-bold text-primary">
              Hackingly
            </span>
          </h3>
          <p className="text-sm text-justify md:text-lg font-medium text-gray-500">
            At Hackingly, we're passionate about empowering innovators, tech
            enthusiasts, and problem solvers to make a difference. We believe
            that hackathons are the breeding grounds for creativity,
            collaboration, and groundbreaking solutions. That's why we've
            created a platform that simplifies hackathon management, making it
            easier for you to bring your ideas to life. Our team is dedicated to
            providing the tools and support you need to host successful
            hackathons, whether you're a college, community organization, or a
            business looking to foster innovation. We're here to help you every
            step of the way, so you can focus on what truly matters - turning
            your vision into reality. Join us in the exciting world of
            hackathons and let's make innovation happen together with Hackingly.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="my-20 layoutBox" id="organize-form">
        <FormTabs />
      </section>
    </>
  );
};

export default OrganizeEventForm;
