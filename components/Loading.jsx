import { Spinner } from "@nextui-org/react";
import React from "react";
const Loading = () => {
  return (
    <div className="min-h-screen w-full justify-center flex items-center text-center mx-auto">
      <Spinner label="Loading..." color="warning" size='lg'  />
    </div>
  );
};

export default Loading;

export const GettingData = () => {
  return (
    <div className="min-h-screen w-full justify-center flex items-center text-center mx-auto">
      <Spinner label="Getting Data..." color="warning" size='lg'  />
    </div>
  );
};


