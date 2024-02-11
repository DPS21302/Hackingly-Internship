import React from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";
import Loading from "../Loading";

const CompanyOverviewSection = ({ orgData }) => {
  if(!orgData) return <Loading/>;
  return (
    <Card
      className="flex-1 p-2 border border-default-200 sticky top-24 h-fit"
      shadow="none"
    >
      <CardBody>
        <h3 className="font-medium">Overview</h3>
        <Divider className="my-3" />
        <p className="text-sm mb-5">{orgData?.description}</p>
      </CardBody>
    </Card>
  );
};

export default CompanyOverviewSection;
