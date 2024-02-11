"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PiBuildings, PiMapPin } from "react-icons/pi";
import { baseURL } from "@/utils/BaseURL";
import useLoading from "@/hooks/useLoading";
import OppSidebarData from "@/components/opportunityHomePage/OppSidebarData";
import OppDetailsTab from "@/components/opportunityHomePage/OppDetailsTab";
import Loading from "@/components/Loading";
import OppRegisterBtn from "@/components/opportunityHomePage/OppRegisterBtn";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function OpportunityHomePage() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { id } = useParams();
  const { data: session, status } = useSession();
  const token = session?.user?.data?.access;

  const [opportunityData, setOpportunityData] = useState([]);
  const organizationId = opportunityData?.organization?.id || "";
  const organizationName = opportunityData?.organization?.name || "";
  const fetchOppById = async () => {
    startLoading();
    if (status === "authenticated") {
      try {
        const response = await axios.get(`${baseURL}/opportunity/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("response....... with auth", response.data);
        setOpportunityData(response.data.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        stopLoading();
      }
    } else {
      try {
        const response = await axios.get(`${baseURL}/opportunity/${id}/`);
        // console.log("response.......", response.data);
        setOpportunityData(response.data.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        stopLoading();
      }
    }
  };

  useEffect(() => {
    fetchOppById();
  }, [id, token]);

  // console.log('opportunityData orginial.....',opportunityData)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="layoutBox pt-20">
          <div className="w-full h-[200px] md:h-[400px] relative mt-10 mb-5">
            {opportunityData["opportunity_cover_picture"] === null ? (
              <img
                src="https://picsum.photos/400/1000"
                className="absolute inset-0 h-full w-full rounded-lg"
              />
            ) : (
              <img
                src={opportunityData["opportunity_cover_picture"]}
                className="absolute inset-0 h-full w-full rounded-lg"
              />
            )}
          </div>
          <section className="flex flex-col md:flex-row gap-5 relative w-full">
            <Card
              className="border border-default-200 bg-slate-50 w-full md:w-[70%] h-fit"
              shadow="none"
            >
              <CardBody className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  {/* Image */}
                  <div className="border border-violet-500 relative">
                    <Image
                      src={
                        opportunityData["opportunity_main_picture"] ||
                        "https://picsum.photos/150/150"
                      }
                      // className="absolute inset-0  rounded-md"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </div>
                  {/* Overview */}
                  <div className="">
                    <div className="flex items-center gap-3">
                      <div className="flex   justify-between items-center mx-auto w-full ">
                        <div>
                          <h2 className="text-2xl font-semibold mb-3">
                            {opportunityData["name"]}
                          </h2>
                          <Link
                            // href={`/organization/${organizationId}`}
                            href={"/coming-soon"}
                            className="text-base font-medium gap-2"
                          >
                            <PiBuildings size={22} className="text-primary" />
                            {organizationName}
                          </Link>
                        </div>
                        <div>
                          <OppRegisterBtn opportunityData={opportunityData} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">
                        {opportunityData.description}
                      </p>
                    </div>
                    {opportunityData["mode"] === "online" ? (
                      <span className="text-base font-medium gap-2 flex">
                        <PiMapPin size={22} />
                        {opportunityData["mode"]}
                      </span>
                    ) : (
                      <span className="text-base font-medium gap-2 flex">
                        <PiMapPin size={22} />
                        {opportunityData["location"]}
                      </span>
                    )}

                    {/* Tags */}
                    <div className="flex gap-2 mt-3">
                      {opportunityData["tags"] &&
                        opportunityData["tags"].map((item) => {
                          return <Code key={item.id}>{item.name}</Code>;
                        })}
                    </div>
                  </div>
                </div>

                {/* <OppRegisterBtn opportunityData={opportunityData} /> */}
                {/* Only visible in Mobile/Tablet */}
                <OppSidebarData
                  isMobile={true}
                  opportunityData={opportunityData}
                />

                {/* Opportunity Details */}
                <div>
                  <OppDetailsTab opportunityData={opportunityData} />
                </div>
              </CardBody>
            </Card>
            {/* Only visible in Desktop */}
            <OppSidebarData
              isMobile={false}
              opportunityData={opportunityData}
            />
          </section>
        </div>
      )}
    </>
  );
}
