"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import CommunityForm from "./forms/CommunityForm";
import BusinessForm from "./forms/BusinessForm";

export default function FormTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div
      className="flex flex-col w-full text-center"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Tabs
        value={tabIndex}
        onChange={setTabIndex}
        radius="full"
        className="border-[8px] border-[#6754e3] rounded-full "
        aria-label="Forms"
        color="primary"
      >
        
        <Tab title="For Business">
          <Card>
            <CardBody>
              <BusinessForm />
            </CardBody>
          </Card>
        </Tab>
        <Tab title="For Community">
          <Card>
            <CardBody>
              <CommunityForm />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
