"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
  FaGithub,
  FaLink,
  FaPencil,
  FaUser,
  FaBookmark,
  FaMapPin,
  FaIndianRupeeSign,
} from "react-icons/fa6";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaInfoCircle,
  FaCalendarAlt,
  FaBriefcase,
  FaUniversity,
  FaBook,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { baseURL } from "@/utils/BaseURL";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EventCard = ({ opportunity }) => {

  const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { data: session, status } = useSession();
  
    useEffect(() => {
      
      if (session && status === "authenticated") {
        setIsLoggedIn(true);
      }
    }, [session, status]);
  
    const handleClick = async (opportunityId) => {
     
  
      if (!isLoggedIn) {
        // Redirect to login if not logged in
        router.push("/login");
        return;
      }
  
      const token = session?.user?.data?.access;
      // console.log("Session card = " + token);
  
      try {
        // Send a POST request to add bookmark
        const response = await fetch(
          `${baseURL}/opportunity/${opportunityId}/bookmark/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          // console.log(response);
          // console.log("Bookmark added successfully");
          toast.success("Bookmark added successfully");
          // Handle success if needed
        } else {
          // console.log(response);
          // console.error("Failed to add bookmark");
          toast.error("Failed to add bookmark");
          // Handle failure if needed
        }
      } catch (error) {
        toast.error("Error handling bookmark", error);
      }
    };

  const [eventStatus, setEventStatus] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const opportunityDate = new Date(opportunity.start_date);
    const endDate = new Date(opportunity.end_date);

    if (currentDate < opportunityDate) setEventStatus("Live");
    else if (currentDate >= opportunity.start_date && currentDate <= endDate)
      setEventStatus("Ongoing");
    else setEventStatus("Ended");
  }, [opportunity.start_date, opportunity.end_date]);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="block rounded-lg  shadow-lg shadow-gray-200 w-fit m-5 md:m-5 md:w-[300px] overflow-hidden transition-transform hover:scale-105 duration-300 relative">
        {/* Live status indication */}
        {eventStatus === "Live" && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-600 pl-2 pr-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <p className="text-white font-semibold">Live</p>
          </div>
        )}

        {eventStatus === "Ongoing" && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-green-500 pl-2 pr-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <p className="text-white font-semibold">Ongoing</p>
          </div>
        )}

        {eventStatus === "Ended" && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-gray-500 pl-2 pr-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <p className="text-white font-semibold">Ended</p>
          </div>
        )}
        <div className="w-[300px] flex mx-auto rounded-md object-cover  ">
          <Image
            alt="Home"
            src={
              opportunity.opportunity_main_picture
                ? opportunity.opportunity_main_picture
                : "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            }
            height={300}
            width={300}
            className=""
          />
        </div>
        <div className="p-3">
          <div className="mt-1 sm:mt-0">
            <p className="font-semibold text-purple-500 text-base">
              {opportunity.opportunity_type}
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <div className="flex">
              <div className="mt-0 sm:mt-0">
                <h4 className=" text-2xl font-bold">{opportunity.name}</h4>
              </div>
            </div>
            <div
              className="sm:inline-flex sm:shrink-0 sm:items-center sm:justify-end"
              onClick={() => handleClick(opportunity.id)}
              style={{ cursor: "pointer" }}
            >
              {/* Standard bookmark icon */}
              <FaBookmark
                size={20}
                className={
                  opportunity.is_bookmarked ? "text-[#6956e3]" : "text-slate-950"
                }
              />
            </div>
          </div>

          <div className="my-2">
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
              {opportunity.description}
            </p>
            <Link href={`/events/${opportunity.id}`} className="">
              <span className="text-slate-950 cursor-pointer text-sm font-bold">
                Read more
              </span>
            </Link>
          </div>
          <div className=" items-center justify-between text-xs text-gray-700">
            <div className="flex items-center">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1 h-4 w-4 text-slate-950" />
                <p className="mr-4 text-sm">{opportunity.start_date}</p>
              </div>
              <div className="flex items-center mr-auto">
                <FaMapPin className="mr-1 h-4 w-4 text-slate-950" />
                <p className="text-sm">
                  {opportunity.mode === "In Person"
                    ? opportunity.location
                    : "Online"}
                </p>
              </div>
            </div>

            <div className="flex my-2">
              <FaIndianRupeeSign className="mr-1 h-4 w-4 text-slate-950" />
              {opportunity.is_paid ? (
                <p className="text-sm">{opportunity.fees}</p>
              ) : (
                <p className="text-sm">Free</p>
              )}
            </div>
          </div>
          <div className="">
            <Link href={`/events/${opportunity.id}`} className="">
            <Button
  color={opportunity.is_registered ? "#404040" : "primary"}   
  className="w-full text-xl"
>
  {opportunity.is_registered ? "Registered" : "Register Now"}
</Button>

            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
