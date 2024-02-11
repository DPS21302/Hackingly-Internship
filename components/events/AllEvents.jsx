"use client";

import EventCard from "./EventCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOpportunity } from "@/provider/redux/listOppSlice";


const EventPage = () => {
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const allOpportunities = useSelector((state) => state.listOpp.data?.data);
  // console.log(allOpportunities);
  useEffect(() => {
    dispatch(listOpportunity());
  }, [dispatch]);

  return (
    <>
      
      <section className="pt-20">
       <h1 className="text-center md:text-4xl text-xl font-bold uppercase py-5">All Events</h1>
        <div className=" flex flex-wrap justify-center items-center mx-auto grid-cols-1 gap-3">
        
          {allOpportunities?.map((opportunity) => (
            <EventCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>
    </>
  );
};

export default EventPage;
