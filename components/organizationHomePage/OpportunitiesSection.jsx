"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import OppCard from "./OppCard";
import { FaFigma } from "react-icons/fa6";
import Dummy from "@/assets/images/dummy.webp";
import Loading from "../Loading";
import OppSetting from "@/components/organizationHomePage/tabs/OppSetting";
import MembersSettings from "./tabs/MembersSettings";
import EditOrganization from "./tabs/EditOrganization";
import { useSession } from "next-auth/react";
const OpportunitiesSection = ({
  opportunities,
  orgData,
  userData,
  isLoading,
  organizationUser,
}) => {
  // console.log("org data", orgData);
  // console.log("org user", organizationUser);
  // console.log("user data", userData);
  const { data: session } = useSession();
  // console.log("session data ", session);
  const currentUserID = userData?.id;
  const isCurrentUserSuperuser = userData?.is_superuser;
  const isOrgAdmin = organizationUser?.some((user) => {
    return user.access_type === "ADMIN" && user.user === currentUserID;
  });
  // console.log("isOrgAdmin", isOrgAdmin);
  // const isOrgAdmin = organizationUser?.users?.some(
  //   (user) =>
  //     user.access_type === "ADMIN" && user.user_profile === currentUserID
  // );

  let tabs = [
    {
      id: "opportunities",
      label: "Opportunities",
      content: (
        <OppSetting
          opportunities={opportunities}
          isLoading={isLoading}
          orgData={orgData}
        />
      ),
    },
    {
      id: "members",
      label: "Members",
      content: (
        <MembersSettings
          organizationUser={organizationUser}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "editOrg",
      label: "Edit Organization",
      content: (
        <EditOrganization organizationData={orgData} isLoading={isLoading} />
      ),
    },
  ];

  if (!opportunities) {
    return <Loading />;
  }

  return (
    <>
      <Card className="border border-default-200" shadow="none">
        <CardBody>
          <Card className="border border-default-200" shadow="none">
            <CardBody className="">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="border rounded-lg from-red-400 bg-gradient-to-b to-sky-300 w-fit p-2">
                    <FaFigma size={38} color="white" />
                  </div>

                  <h1 className="text-2xl font-medium text-primary">
                    {orgData?.name}
                  </h1>
                </div>
              </div>
            </CardBody>
          </Card>
          {/* tabs */}
          {isCurrentUserSuperuser || isOrgAdmin ? (
            <>
              <div className="flex w-full flex-col my-20">
                <Tabs aria-label="Dynamic tabs" items={tabs}>
                  {(item) => (
                    <Tab key={item.id} title={item.label}>
                      <Card
                        shadow="none"
                        className="border border-zinc-200 bg-transparent shadow-none"
                      >
                        <CardBody>{item.content}</CardBody>
                      </Card>
                    </Tab>
                  )}
                </Tabs>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-medium mt-10">Opportunities</h3>
                <Divider className="my-3" />
                <div className="flex flex-wrap gap-4 justify-center">
                  {opportunities?.map((item) => {
                    if (item.organization.id === orgData?.id) {
                      return (
                        <OppCard
                          key={item.id}
                          OpportunityName={item.name}
                          OpportunityMode="Online"
                          opportunityCoverImg={
                            item.opportunity_main_picture
                              ? item.opportunity_main_picture
                              : Dummy
                          }
                          OpportunityLink={`/opportunities/${item.id}`}
                          startDate={item.start_date || "TBA"}
                          time={item.start_date || "TBA"}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default OpportunitiesSection;
