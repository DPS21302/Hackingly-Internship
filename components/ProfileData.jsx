import React, { useEffect, useState } from "react";
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
import { Pencil } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Album, MousePointerClick } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import { useSession } from "next-auth/react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ProfileData = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("education"); // 'education' or 'experience'
  const { data: session, status } = useSession();

  const router = useRouter();

  // console.log(session?.user?.data?.access);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // console.log("userData", userData);

  const [aboutme, setAboutMe] = useState(userData?.bio);
  const renderModule = {
    toolbar: false,
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [
        { align: [] },
        { align: ["center"] },
        { align: ["right"] },
        { align: ["justify"] },
      ],
      [{ color: [] }, { background: [] }],
      ["clean"],
      ["code-block"],
      ["table"], // Include the table button
    ],
  };
  return (
    <div>
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[396px] lg:h-[250px]">
          {/* cover photo */}
          <img
            src={
              userData?.cover_picture ??
              "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            }
            className="w-full h-full lg:rounded-2xl object-cover"
            alt="Cover Photo"
          />
        </div>

        <div className="flex lg:flex-row flex-col lg:ml-10 lg:flex-none lg:items-start items-center -mt-20">
          <div className="lg:flex lg:items-center items-center space-x-2">
            <img
              src={
                userData?.profile_picture ??
                "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              }
              className="w-40 h-40 lg:w-48 lg:h-48 border-4 border-white rounded-full m-auto"
              alt="Profile Photo"
            />

            {/* name,location,dateofbirth */}
            <div className="flex flex-row items-start lg:mt-24  ">
              <div className=" flex-col items-start text-center ">
                <p className="text-center items-center text-2xl font-bold mb-2">
                  {userData?.middle_name
                    ? `${userData?.first_name} ${userData?.middle_name} ${userData?.last_name}`
                    : `${userData?.first_name} ${userData?.last_name}`}
                </p>

                <div className="flex items-center  profileCenter ">
                  <FaUser className="text-purple-600 mr-2" />
                  <p className="text-gray-700 font-bold capitalize  ">
                    {userData?.gender}
                  </p>
                </div>
                <div className="flex items-center  profileCenter ">
                  <FaMapMarkerAlt className="text-purple-600 mr-2 " />
                  <p className="text-gray-700 font-bold ">
                    {userData?.city}, {userData?.state}
                  </p>
                </div>

                <div className="flex items-center text-center profileCenter ">
                  <FaCalendarAlt className="text-purple-600 mr-2" />
                  <p className="text-gray-700 font-bold ">
                    {userData?.date_of_birth &&
                      new Date(userData.date_of_birth).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                  </p>
                </div>
              </div>
              <div className=" w-fit p-1 rounded-lg text-purple-600 cursor-pointer ml-1 mr-2">
                <Pencil
                  size={26}
                  onClick={() => router.push("/profile/edit")}
                  variant="edit"
                />
              </div>
            </div>
          </div>

          {/* social links */}
          <div className="flex items-center space-x-2 lg:ml-auto justify-center lg:mb-auto lg:mt-16 p-8">
            {userData?.instagram && (
              <div className="bg-primary-50 w-fit p-1 rounded-lg text-rose-600 cursor-pointer">
                <FaInstagram size={32} />
              </div>
            )}
            {userData?.linkedin && (
              <div className="bg-primary-50 w-fit p-1 rounded-lg text-blue-500 cursor-pointer">
                <FaLinkedin size={32} />
              </div>
            )}
            {userData?.twitter && (
              <div className="bg-primary-50 w-fit p-1 rounded-lg text-slate-900 cursor-pointer">
                <FaXTwitter size={32} />
              </div>
            )}
            {userData?.facebook && (
              <div className="bg-primary-50 w-fit p-1 rounded-lg text-blue-500 cursor-pointer">
                <FaFacebook size={32} />
              </div>
            )}
            {userData?.github && (
              <div className="bg-primary-50 w-fit p-1 rounded-lg text-black cursor-pointer">
                <FaGithub size={32} />
              </div>
            )}
            {userData?.website && (
              <div className="bg-primary-50 w-fit p-1 rounded-lg text-black cursor-pointer">
                <FaLink size={32} />
              </div>
            )}
          </div>
        </div>
        {/* about me */}
        <div className="flex flex-col w-full 2xl:w-2/3">
          <div className="flex-1 bg-white rounded-lg  p-8">
            <h4 className="text-xl text-gray-900 font-bold">About Me</h4>
            {/* <p className="mt-2 text-gray-700">{userData?.bio}</p> */}
            <ReactQuill
              modules={renderModule}
              value={userData?.bio}
              readOnly
              className="mt-2 text-gray-700 displayQuill"
            />
          </div>
        </div>
      </div>
      {/* Education and Experience details */}
      <div className="bg-white rounded-lg shadow-xl pb-8 mt-10 overflow-hidden">
        <h2 className="text-3xl mb-1 mt-2 text-center font-bold ">
          Profile Overview
        </h2>

        {/* tab switch for education and experience */}
        <div className="flex justify-center items-center mb-6 pt-6 pb-6 ">
          <div className="bg-default-100 flex items-center rounded-xl">
            <div
              className={`cursor-pointer mr-1 px-6 py-2 rounded-xl ${
                activeTab === "education"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } transition-all duration-300`}
              onClick={() => handleTabChange("education")}
            >
              Education
            </div>
            <div
              className={`cursor-pointer ml-1 px-6 py-2 rounded-xl ${
                activeTab === "experience"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } transition-all duration-300`}
              onClick={() => handleTabChange("experience")}
            >
              Experience
            </div>
          </div>
        </div>

        {/* display education details */}
        {activeTab === "education" && (
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
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {userData?.education &&
              userData.education.map((edu, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <div className="block p-6 rounded-lg shadow-lg bg-[#6633990a] max-w-md mx-6 mb-10 mt-10">
                      <div className="flex items-center justify-center mb-4">
                        <FaUniversity className="text-purple-600 mr-2 text-3xl" />
                        <h2 className="text-2xl text-gray-700 font-bold capitalize">
                          {edu?.name}
                        </h2>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaMapMarkerAlt className="text-purple-600 mr-2" />
                        <p className="text-gray-700 capitalize">
                          <span className="font-bold">Location : </span>
                          {edu?.city}, {edu?.state}
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaGraduationCap className="text-purple-600 mr-2" />
                        <p className="text-gray-700 capitalize">
                          <span className="font-bold capitalize">
                            Degree :{" "}
                          </span>
                          {edu?.degree}
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaGraduationCap className="text-purple-600 mr-2" />
                        <p className="text-gray-700 capitalize">
                          <span className="font-bold">Major : </span>
                          {edu?.major}
                        </p>
                      </div>

                      <div className="flex items-center mb-4">
                        <FaCalendarAlt className="text-purple-600 mr-2" />
                        {edu?.still_enrolled ? (
                          <p className="text-gray-700">
                            <span className="font-bold">Duration : </span>
                            {new Date(edu?.start_date).toLocaleDateString()} -
                            Present : {edu?.year} yrs
                          </p>
                        ) : (
                          <p className="text-gray-700">
                            <span className="font-bold">Duration : </span>
                            {new Date(
                              edu?.start_date
                            ).toLocaleDateString()} -{" "}
                            {new Date(edu?.end_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-center mb-4">
                        <div className="flex items-center mb-2">
                          <FaInfoCircle className="text-purple-600 mr-2 text-2xl" />
                          <h3 className="text-xl font-bold text-center">
                            Description
                          </h3>
                        </div>
                        <div className="flex justify-center text-justify items-center mb-4">
                          <p className="text-gray-700">{edu?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
        {/* display experience details  */}
        {activeTab === "experience" && (
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
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {userData?.jobs &&
              userData.jobs.map((job, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <div className="block p-6 rounded-lg shadow-lg bg-[#6633990a] max-w-md mx-6 mb-10 mt-10">
                      <div className="flex items-center justify-center mb-4">
                        <FaBuilding className="text-purple-600 mr-2 text-3xl" />
                        <h2 className="text-2xl text-gray-700 font-bold capitalize">
                          {job?.name}
                        </h2>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaMapMarkerAlt className="text-purple-600 mr-2" />
                        <p className="text-gray-700 capitalize">
                          <span className="font-bold">Location : </span>
                          {job?.city}, {job?.state}
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaBriefcase className="text-purple-600 mr-2 capitalize" />
                        <p className="text-gray-700">
                          <span className="font-bold">Role : </span>
                          {job?.job_title}
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaCalendarAlt className="text-purple-600 mr-2" />

                        {job?.still_working ? (
                          <p className="text-gray-700">
                            <span className="font-bold">Joining Date : </span>
                            {new Date(job?.start_date).toLocaleDateString()} -
                            Present
                          </p>
                        ) : (
                          <p className="text-gray-700">
                            <span className="font-bold">Duration : </span>
                            {new Date(
                              job?.start_date
                            ).toLocaleDateString()} -{" "}
                            {new Date(job?.end_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-center mb-4">
                        <div className="flex items-center mb-2">
                          <FaInfoCircle className="text-purple-600 mr-2 text-2xl" />
                          <h3 className="text-xl font-bold text-center">
                            Description
                          </h3>
                        </div>
                        <div className="flex justify-center items-center mb-4">
                          <p className="text-gray-700">{job?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>

      {/* display bookmarked opportunities */}
      {userData?.bookmarked_opportunities &&
        userData.bookmarked_opportunities.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl pb-8 mt-10 overflow-hidden">
            <div className="layoutBox">
              <h2 className="text-3xl mb-1 mt-2 text-center font-bold ">
                Bookmarked Events
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
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {userData?.bookmarked_opportunities &&
                    userData.bookmarked_opportunities.map(
                      (opportunity, index) => (
                        <SwiperSlide key={index}>
                          <EventCard opportunity={opportunity} />
                        </SwiperSlide>
                      )
                    )}
                </Swiper>
              </div>
            </div>
          </div>
        )}

      {/* display participated opportunites */}
      {userData?.participated_opportunities &&
        userData.participated_opportunities.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl pb-8 mt-10 overflow-hidden">
            <div className="layoutBox">
              <h2 className="text-3xl mb-1 mt-2 text-center font-bold ">
                Participated Events
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
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {userData?.participated_opportunities &&
                    userData.participated_opportunities.map(
                      (opportunity, index) => (
                        <SwiperSlide key={index}>
                          <EventCard opportunity={opportunity} />
                        </SwiperSlide>
                      )
                    )}
                </Swiper>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ProfileData;
