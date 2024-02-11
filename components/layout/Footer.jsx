import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import G from '@/assets/images/G.webp';
import Image from 'next/image';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="mt-4 md:mt-24 w-full bg-primary h-fit px-4 md:px-40 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-20">
        {/* Logo and Mission */}
        <div className="flex flex-col text-center md:text-left ">
          <Image
            className=" h-1/2 md:h-3/6 mt-4 md:mt-8"
            src={G}
            height={100}
            alt="logo"
          />

          <div className="flex flex-col md:mt-16">
            <h1 className="text-white mt-4 md:mt-[-40px]">
              "Our mission is to empower the innovators of the future through meaningful and immersive learning journeys."
            </h1>
          </div>
        </div>

        {/* Hackathon Section */}
        <div className="flex flex-col text-center md:text-left">
          <div className="text-center md:text-left md:mt-16">
            <h1 className="mt-4 md:mt-0 text-white font-semibold text-2xl">
              HACKATHON
            </h1>
            <div className="text-white mt-4 cursor-pointer">
              <Link href="/organize-event">
                <h2>Organize Event</h2>
              </Link>
              <Link href="/organize-event">
                <h2>Community Events</h2>
              </Link>
              <Link href="/organize-event">
                <h2>Corporate Events</h2>
              </Link>
              <Link href="https://docs.google.com/document/d/1POZGiRzRmRsCbAqnyVSjbV03OBAyCThc7iIq1TwAFdQ/edit">
                <h2>Event Guide</h2>
              </Link>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className="flex flex-col text-center md:text-left">
          <div className="text-center md:text-left md:mt-16">
            <h1 className="mt-4 md:mt-0 text-white font-semibold text-2xl">
              COMPANY
            </h1>
            <div className="text-white mt-4 cursor-pointer">
            {/* <Link href="/about-us">
              <h2>About Us</h2>
            </Link>
            <Link href="/faq">
              <h2>FAQ</h2>
            </Link> */}
            <Link href="/support">
              <h2>Contact Us</h2>
            </Link>
            </div>
          </div>
        </div>

      

        
      </div>

      {/* Social Icons */}
      <div className="flex mt-4 md:mt-100 items-end lg:justify-start justify-center">
        <Link href="https://www.instagram.com/hackingly_/" className="mr-4">
          <span style={{ color: 'white' }}>
            <FaInstagram size={30} />
          </span>
        </Link>
        <Link href="https://www.linkedin.com/company/hackingly/" className="mr-4">
          <span style={{ color: 'white' }}>
            <FaLinkedin size={30} />
          </span>
        </Link>
        <Link href="https://discord.gg/gCh96bjF" className="mr-4">
          <span style={{ color: 'white' }}>
            <FaDiscord size={30} />
          </span>
        </Link>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
      <span className="block text-lg text-center text-white" >
        © {new Date().getFullYear()} <a href="https://hackingly.in/" className="hover:underline">Hackingly™</a>. All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
