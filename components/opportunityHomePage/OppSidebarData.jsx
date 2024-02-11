import React from "react";
import { PiTrophy, PiUsers, PiUsersThree } from "react-icons/pi";
import { FaRupeeSign } from "react-icons/fa";
import OppSocials from "./OppSocials";
import { Card, CardBody } from "@nextui-org/card";
import { formatDate } from "@/utils/formateDate";

export default function OppSidebarData({ opportunityData, isMobile }) {
  return (
    <>
      <Card
        className={`${
          isMobile ? "block md:hidden" : "hidden md:block"
        } border border-default-200 bg-slate-50 flex-1 h-fit`}
        shadow="none"
      >
        <CardBody>
          {/* Days left */}
          <div className="border border-primary-100 bg-primary-50 mb-3 p-2 rounded-lg">
            <span className="font-medium text-xl mb-3 text-slate-700">
              Event Date
            </span>
            <h4 className="text-lg text-primary font-medium w-fit">
              {formatDate(opportunityData["start_date"], {
                option: "short",
              })}{" "}
              to{" "}
              {formatDate(opportunityData["end_date"], {
                option: "short",
              })}
            </h4>
          </div>
          <div className="border border-primary-100 bg-primary-50 p-2 rounded-lg">
            <span className="font-medium text-xl mb-3 text-slate-700">
              Registration Deadline
            </span>

            <h4 className="text-lg text-primary font-medium w-fit">
              {formatDate(opportunityData["registration_deadline"], {
                option: "short",
              })}
            </h4>
          </div>
          {/*education Details */}
          <div>
            <div className="flex gap-2 my-5">
              {/* Icon left */}
              <div className="h-fit border border-primary-200 rounded-md text-primary bg-primary-50 p-1.5">
                <PiUsers size={32} />
              </div>
              {/*education Details right */}
              <div className="flex justify-between flex-col h-full">
                <span className="text-sm ">Team size</span>
                <span className="text-primary font-medium">
                  {opportunityData["max_team_size"] === 1
                    ? `${opportunityData["max_team_size"]} member`
                    : `${opportunityData["max_team_size"]} members`}
                </span>
              </div>
            </div>
            {opportunityData.is_paid ? (
              <div className="flex gap-2 my-5">
                {/* Icon left */}
                <div className="h-fit border border-primary-200 rounded-md text-primary bg-primary-50 p-1.5">
                  <FaRupeeSign size={32} />
                </div>

                <div className="flex justify-between flex-col h-full">
                  <span className="text-sm">Fees</span>
                  <span className="text-primary font-medium">
                    {opportunityData["fees"]}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 my-5">
                {/* Icon left */}
                <div className="h-fit border border-primary-200 rounded-md text-primary bg-primary-50 p-1.5">
                  <FaRupeeSign size={32} />
                </div>

                <div className="flex justify-between flex-col h-full">
                  <span className="text-sm">Fees</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
              </div>
            )}
            {opportunityData["prize_pool"] !== null && (
              <div className="flex gap-2 my-5">
                {/* Icon left */}
                <div className="h-fit border border-primary-200 rounded-md text-primary bg-primary-50 p-1.5">
                  <PiTrophy size={32} />
                </div>
                {/*education Details right */}

                <div className="flex justify-between flex-col h-full">
                  <span className="text-sm">Prize Pool</span>
                  <span className="text-primary font-medium">
                    {opportunityData["prize_pool"]}
                  </span>
                </div>
              </div>
            )}
            {opportunityData.participation_type !== "INDIVIDUAL" && (
              <div className="flex gap-2 my-5">
                {/* Icon left */}
                <div className="h-fit border border-primary-200 rounded-md text-primary bg-primary-50 p-1.5">
                  <PiUsersThree size={32} />
                </div>
                {/*education Details right */}

                <div className="flex justify-between flex-col h-full">
                  <span className="text-sm">Total Participants</span>
                  <span className="text-primary font-medium">
                    {opportunityData["participants"]}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Socials */}

          <OppSocials links={opportunityData["social_links"]}/>

        </CardBody>
      </Card>
    </>
  );
}
