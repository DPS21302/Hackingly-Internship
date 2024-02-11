import { Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { PiGlobe } from "react-icons/pi";

const iconMapping = {
  INSTAGRAM: <FaInstagram size={32} />,
  FACEBOOK: <FaFacebook size={32} />,
  LINKEDIN: <FaLinkedin size={32} />,
  GITHUB: <FaGithub size={32} />,
  DISCORD: <FaDiscord size={32} />,
  WEBSITE: <PiGlobe size={32} />,
  TWITTER: <FaTwitter size={32} />,
};

export default function OppSocials({ links }) {
  return (
    <div className="flex flex-row flex-wrap gap-3">

      {links?.map((item, index) => {
        const IconComponent = iconMapping[item.name];
        if (!IconComponent) return null; // Skip if icon mapping is not found
        return (
          <Link key={index} href={item.link}>
            <div className="bg-primary-50 w-fit p-1 rounded-lg text-primary">
              {IconComponent}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
