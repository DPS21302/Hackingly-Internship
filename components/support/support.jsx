"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import top from "@/assets/images/top.webp";
import enquiry from "@/assets/images/enquiry.webp";
import LaptopSupport from "@/assets/images/LaptopSupport.webp";
import location from "@/assets/images/location.webp";
import office from "@/assets/images/office.webp";

import SupportForm from "../forms/SupportForm";

const Support = () => {
  return (
    <>
      <div className="z-10 h-fit md:h-[80vh] pt-20 relative overflow-hidden ">
        <Image
          src={top}
          alt="Top Image"
          className="block absolute inset-0 w-full h-full object-cover -z-10 select-none"
        />
        <div className="z-100 flex justify-center">
          <Image src={LaptopSupport} alt="" style={{ width: "48rem" }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-center">
        <div className="md:items-end">
          <SupportForm />
        </div>
        <div className="flex flex-col w-full md:w-3/4 text-white bg-primary rounded-3xl p-6">
          <h3 className="text-xl md:text-2xl text-center py-5 font-bold">
            Contact Info
          </h3>

          <div className="flex flex-col gap-4 justify-center mx-auto">
            <ContactSection
              image={location}
              title="Our Addresses"
              details={[
                {
                  label: "Headquarters",
                  address:
                    "501-502, Sun n Moon Chambers, Gopabari, Jaipur, Rajasthan-302001",
                },
                {
                  label: "Registered Office",
                  address:
                    "17A, Ganpati Enclave, Jamdoli, Jaipur, Rajasthan-302031",
                },
              ]}
            />
            <ContactSection
              image={office}
              title="Company Details"
              details={[
                {
                  label: "Headquarters",
                  address:
                    "501-502, Sun n Moon Chambers, Gopabari, Jaipur, Rajasthan-302001",
                },
                {
                  label: "Registered Office",
                  address:
                    "17A, Ganpati Enclave, Jamdoli, Jaipur, Rajasthan-302031",
                },
              ]}
            />

            <ContactSection
              image={enquiry}
              title="Inquiries"
              details={[
                {
                  label: "Sales",
                  info: "sales@hackingly.in, NTBD (Monday to Saturday, 9AM - 7PM)",
                },
                { label: "Partnerships", info: "partnership@hackingly.in" },
                {
                  label: "Helpdesk & General queries",
                  info: "hello@hackingly.in",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
const ContactSection = ({ image, title, details }) => (
  <div className=" flex justify-center mx-auto ">
    <div className="items-center flex justify-center ">
      <Image src={image} alt={title} height={80} width={80} />
    </div>
    <div className="flex flex-col p-5 ">
      <h3 className="text-lg md:text-lg font-bold">{title}</h3>
      {details.map((item, index) => (
        <p key={index}>
          <span className="text-xs md:text-lg font-bold">{item.label}: </span>
          {item.address || item.info}
        </p>
      ))}
    </div>
  </div>
);
