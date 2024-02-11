"use client";

import { useState, useLayoutEffect } from "react";

import {
  RocketIcon,
  Megaphone,
  HeartHandshake,
  Key,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import G from "@/assets/images/G.webp";
import BlackOrange from "@/assets/images/logo-black-orange.webp";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "@/provider/redux/userProfileSlice";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const PrimaryNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [flyer, setFlyer] = useState(false);
  const [flyerTwo, setFlyerTwo] = useState(false);

  const isHomeRoute = pathname === "/";
  const OrganizeEvent = pathname === "/organize-event";
  const Support = pathname === "/support";

  const profileDropdownItems = [
    { key: "profilePage", label: "Profile", href: "/profile" },
    { key: "logout", label: "Logout", onClick: () => signOut() },
  ];

  const navbarItems = [
    { icon: <RocketIcon size={20} />, name: "Events", href: "/events" },
    { icon: <Megaphone size={20} />, name: "Demo", href: "/organize-event" },
    { icon: <HeartHandshake size={20} />, name: "Support", href: "/support" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userData = useSelector(
    (state) => state?.userProfile?.userProfile?.data
  );
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (session && status === "authenticated") {
      setIsLoggedIn(true);
    }
    dispatch(fetchUser(session?.user?.data?.access));
  }, [session, status, dispatch, fetchUser]);

  const initials = (firstName, lastName) => {
    return firstName?.charAt(0) + lastName?.charAt(0);
  };
  const signOutFunction=()=>{
    signOut();
    toast.success("Logout successfully");
  }

  const handleItemClick = () => {
    setOpen(false); // Close the flyer immediately after clicking a navigation item
  };

  return (

    <div

      className={
        isHomeRoute || OrganizeEvent || Support
          ? "bg-transparent relative text-white"
          : "bg-[#6754e3] relative text-white w-100%"
      }
    >
      <div className=" w-full px-8 sm:px-6">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="font-bold text-inherit text-xl">
              <Image src={G} width={180} alt="" />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <nav className="hidden md:flex space-x-10">
              <div className="relative flex">
                {navbarItems.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="flex gap-3 mx-5 flex-row items-center justify-center text-base font-medium text-white hover:text-gray-300"
                    onClick={handleItemClick} // Close the flyer immediately after clicking
                  >
                    <div
                      className="text-base font-medium text-white hover:text-gray-900 flex flex-row"
                      onMouseEnter={() => setFlyer(true)}
                      onMouseLeave={() => setFlyer(false)}
                    >
                      <span className="flex flex-col items-center justify-center ">
                        {item.icon}
                        {item.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>

            {isLoggedIn ? (
              <div className="hidden md:flex">
                <Dropdown>
                  <DropdownTrigger>
                    <div
                      className="text-base font-medium text-white hover:text-gray-300 flex flex-row"
                      onMouseEnter={() => setFlyerTwo(true)}
                      onMouseLeave={() => setFlyerTwo(false)}
                    >
                      <span className="flex flex-col items-center justify-center ">
                        <Avatar
                          src={userData?.profile_picture}
                          alt={userData?.first_name}
                        />
                        {userData?.first_name}
                      </span>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" align="end">
                    {profileDropdownItems.map((item) => (

                      <DropdownItem
                        key={item.key}
                        color="primary"
                        onClick={
                          item.onClick
                            ? item.onClick
                            : () => router.push(item.href)
                        }
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <Link
                href="/login"
                className="whitespace-nowrap text-base font-medium px-5 py-3 rounded-lg text-white bg-gradient-to-r from-[#ff4721] to-[#ffa52b]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          open
            ? "opacity-100 scale-100 ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            : "opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        }
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image src={BlackOrange} width={180} alt="" />
              </Link>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setOpen(!open)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6">
              <nav className="grid gap-y-8">
                {navbarItems.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    onClick={handleItemClick} // Close the flyer immediately after clicking
                  >
                    <div className="text-base font-medium text-gray-900 flex items-center gap-3">
                      <span className="text-primary">{item.icon}</span>
                      {item.name}
                    </div>
                  </Link>
                ))}
                {isLoggedIn ? (
                  <div className="">
                    <Dropdown>
                      <DropdownTrigger>
                        <div
                          className="text-base font-medium text-primary gap-2 flex flex-row"
                          onMouseEnter={() => setFlyerTwo(true)}
                          onMouseLeave={() => setFlyerTwo(false)}
                        >
                          <span className="flex flex-row items-center justify-center gap-2 ">
                            <Avatar
                              src={userData?.profile_picture}
                              alt={userData?.first_name}
                            />
                            {userData?.first_name}
                          </span>
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Profile Actions" align="end">
                        {profileDropdownItems.map((item) => (
                          <DropdownItem
                            key={item.key}
                            color="primary"
                            onClick={
                              item.onClick
                                ? item.onClick
                                : () => router.push(item.href)
                            }
                          >
                            {item.label}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                ) : (
                  <div className=" grid gap-y-8">
                    <Link
                      href="/login"
                      onClick={handleItemClick}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <div className="text-base font-medium text-gray-900 flex items-center gap-3">
                        <span className="text-primary">
                          <LogIn size={20} />
                        </span>
                        Login
                      </div>
                    </Link>
                    <Link
                      href="/signup"
                      onClick={handleItemClick}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <div className="text-base font-medium text-gray-900 flex items-center gap-3">
                        <span className="text-primary">
                          <Key size={20} />
                        </span>
                        Sign Up
                      </div>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavbar;

