"use client";
import HomePage from "@/components/organizationHomePage/Homepage";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  // const {data: session, status} = useSession();
  // const router = useRouter();
  // useEffect(() => {
  //   if(status === 'unauthenticated'){
  //     router.push('/login');
  //   }
  // }, [status]);

  
  const { id: orgId } = useParams();
  return <HomePage orgId={orgId} /> 
};

export default page;
