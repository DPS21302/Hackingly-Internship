import React from "react";
import OppCard from "../OppCard";
import { Button } from "@nextui-org/react";
import Dummy from "@/assets/images/dummy.webp";
const OppSetting = ({ opportunities, orgData }) => {
  return (<>
  <div className="flex justify-between px-2 items-center">
    <div>
      <h1 className="text-2xl font-semibold">Opportunities</h1>
    </div>
    <div>
      <Button size="lg" color='primary'>
        Create Opportunity
      </Button>
    </div>
  </div>
  <div className="flex flex-wrap gap-4 justify-center">
      {opportunities?.map((item) => {
        if (item.organization.id === orgData?.id) {
          return (
            <OppCard
              key={item.id}
              OpportunityName={item.name}
              OpportunityMode="Online"
              opportunityCoverImg={item.opportunity_main_picture || Dummy}
              OpportunityLink={`/opportunities/${item.id}`}
              startDate={item.start_date || "TBA"}
              time={item.start_date || "TBA"}
            />
          );
        }
        return null;
      })}
    </div>
  </>
    
  );
};

export default OppSetting;
