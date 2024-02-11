"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Album, MousePointerClick } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaBookmark, FaCalendarAlt } from "react-icons/fa";
import { FaIndianRupeeSign, FaMapPin } from "react-icons/fa6";
import Link from "next/link";

const UpcomingCards = ({ opportunities }) => {
  const router = useRouter();
  const upcomingOpportunities = Array.isArray(opportunities)
    ? opportunities
    : [];
  return (
    <div className="my-10 md:my-5 ">
      <div className="layoutBox">
        <h2 className="text-3xl mb-1 mt-2 text-center font-bold ">
          Upcoming Events
        </h2>
        <div className="w-full">
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            className="py-10"
            navigation
            modules={[Navigation, Pagination]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              650: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1115: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1500: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {upcomingOpportunities?.map((item, index) => (
              <SwiperSlide key={index}>
                <UpcomingEventsCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center my-5">
          <Button
            variant="flat"
            color="primary"
            onClick={() => router.push("/events")}
          >
            Explore more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCards;

const UpcomingEventsCard = ({ item }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState("");
  const {
    description,
    id,
    end_date,
    start_date,
    location,
    mode,
    fees,
    is_paid,
    is_registered,
    name,
    registration_deadline,
    registration_status,
    opportunity_cover_picture,
    opportunity_main_picture,
    opportunity_type,
    is_bookmarked,
  } = item;
  const { data: session } = useSession();
  useEffect(() => {
    const currentDate = new Date();
    const opportunityDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (currentDate < opportunityDate) setStatus("Live");
    else if (currentDate >= start_date && currentDate <= endDate)
      setStatus("Ongoing");
    else setStatus("Ended");
    setIsClicked(isClicked);
  }, [start_date, end_date, isClicked]);

  const handleClick = async () => {
    const token = session?.user?.data?.access;
    const opportunityId = item.id;
    // console.log("Session card = " + token);
    try {
      // Send a POST request to add bookmark
      const response = await axios.post(
        `${baseURL}/opportunity/${opportunityId}/bookmark/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // console.log(response.data);

        toast.success("Bookmark added successfully");
        // Handle success if needed
      } else {
        // console.log(response);
        toast.error("Failed to add bookmark");
        // Handle failure if needed
      }
    } catch (error) {
      // console.error("Error handling bookmark", error);
      toast.error("Failed to add bookmark");
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-center"  />
      </div>
      <div className="block rounded-lg  shadow-lg shadow-gray-200 w-fit m-5 md:m-5 md:w-[300px] overflow-hidden transition-transform hover:scale-105 duration-300 relative">
        {/* Live status indication */}
        {status === "Live" && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-600 pl-2 pr-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <p className="text-white font-semibold">Live</p>
          </div>
        )}

        {status === "Ongoing" && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-green-500 pl-2 pr-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <p className="text-white font-semibold">Ongoing</p>
          </div>
        )}

        {status === "Ended" && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-gray-500 pl-2 pr-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <p className="text-white font-semibold">Ended</p>
          </div>
        )}
        <div className="w-[300px] flex mx-auto rounded-md object-cover  ">
          <Image
            alt="Home"
            src={opportunity_main_picture ||
              "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            }
            height={300}
            width={300}
            className=""
          />
        </div>
        <div className="p-3">
          <div className="mt-1 sm:mt-0">
            <p className="font-semibold text-purple-500 text-base">
              {opportunity_type}
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <div className="flex">
              <div className="mt-0 sm:mt-0">
                <h4 className=" text-2xl font-bold">{name}</h4>
              </div>
            </div>
            <div
              className="sm:inline-flex sm:shrink-0 sm:items-center sm:justify-end"
              onClick={() => handleClick(id)}
              style={{ cursor: "pointer" }}
            >
              {/* Standard bookmark icon */}
              <FaBookmark
                size={20}
                className={is_bookmarked ? "primary" : "text-slate-950"}
              />
            </div>
          </div>

          <div className="my-2">
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
              {description}
            </p>
            <Link href={`/events/${id}`} className="">
              <span className="text-slate-950 cursor-pointer text-sm font-bold">
                Read more
              </span>
            </Link>
          </div>
          <div className=" items-center justify-between text-xs text-gray-700">
            <div className="flex items-center">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1 h-4 w-4 text-slate-950" />
                <p className="mr-4 text-sm">{start_date}</p>
              </div>
              <div className="flex items-center mr-auto">
                <FaMapPin className="mr-1 h-4 w-4 text-slate-950" />
                <p className="text-sm">
                  {mode === "In Person" ? location : "Online"}
                </p>
              </div>
            </div>

            <div className="flex my-2">
              <FaIndianRupeeSign className="mr-1 h-4 w-4 text-slate-950" />
              {is_paid ? (
                <p className="text-sm">{fees}</p>
              ) : (
                <p className="text-sm">Free</p>
              )}
            </div>
          </div>
          <div className="">
            <Link href={`/events/${id}`} className="">
              <Button
                color={is_registered ? "grey" : "primary"}
                className="w-full text-xl"
              >
                {is_registered ? "Registered" : "Register Now"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
