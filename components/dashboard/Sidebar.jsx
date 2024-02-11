"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActiveLink = (href) => {
    return pathname === href;
  };

  return (
    <div className="flex flex-col h-full w-1/6 bg-white border-r">
      <div className="flex flex-col py-4 px-6">
        <div>
          <SidebarSection title="Dashboard">
            <SidebarLink href="/dashboard" active={isActiveLink("/dashboard")}>
              Dashboard
            </SidebarLink>
            <SidebarLink
              href="/participants"
              active={isActiveLink("/participants")}
            >
              Participants
            </SidebarLink>
            <SidebarLink
              href="/statistics"
              active={isActiveLink("/statistics")}
            >
              Statistics
            </SidebarLink>
            <SidebarLink
              href="/edit-event"
              active={isActiveLink("/edit-event")}
            >
              Edit Event
            </SidebarLink>
            <SidebarLink
              href="/communication"
              active={isActiveLink("/communication")}
            >
              Communication
            </SidebarLink>
          </SidebarSection>
        </div>
        <div className="mt-auto">
          <SidebarSection title="Other">
            <SidebarLink href="/events" active={isActiveLink("/events")}>
              Events
            </SidebarLink>
            <SidebarLink href="/" active={isActiveLink("/")}>
              Home
            </SidebarLink>
          </SidebarSection>
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm text-gray-600 font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};

const SidebarLink = ({ href, active, children }) => {
  return (
    <Link href={href}>
      <div
        className={`text-gray-800 hover:text-primary py-1 transition duration-300 ${
          active ? "font-bold text-[#6754e3]" : ""
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Sidebar;
