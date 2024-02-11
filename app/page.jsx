"use client"

import UpcomingCards from "../components/UpcomingCards";
import HeroSection from "../components/landing/HeroSection";
import OurServices from "@/components/landing/OurServices";
import JoinCommunity from "@/components/landing/JoinCommunity";
import Faq from "@/components/landing/Faq";
import Stats from "@/components/landing/Stats";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { listOpportunity } from "@/provider/redux/listOppSlice";
import useLoading from "@/hooks/useLoading";
import { useEffect } from "react";
import Loading from "@/components/Loading";

const HomePage = ()=> {
  const { isLoading, startLoading, stopLoading } = useLoading();


  const dispatch = useDispatch();
  const opportunities = useSelector((state) => state.listOpp.data?.data);
  
  useEffect(() => {
    startLoading();
    dispatch(listOpportunity());
    stopLoading();
  }, [dispatch, startLoading, stopLoading]);
  
  return (
    <>
      <HeroSection />
      <div className="fixed bottom-10 right-10 z-[100]">
        <Link href="/organize-event"
         className="px-3 py-3 rounded-2xl shadow-xl bg-black text-white z-50 hover:shadow-2xl transition duration-300 ease-in-out"
          
        >
          Request Demo
        </Link>
      </div>
      {isLoading? <Loading/> :<UpcomingCards opportunities={opportunities} /> }
      
      <OurServices />
      <JoinCommunity />
      <Stats />
      <Faq />
    </>
  );
}


export default HomePage;