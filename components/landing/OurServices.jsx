import { Card, CardBody } from '@nextui-org/react'
import { FileJson2, Landmark, Rocket, Trophy } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const OurServices = () => {
  return (
    <div className="bg-primary-50 p-10">
    <h2 className="text-3xl mb-5 font-medium text-center">
      Our Services
    </h2>
    <div className="flex flex-wrap justify-center gap-5">
      {Services.map((Services, i) => (
        <OurServicesCard service={Services} key={i} />
      ))}
    </div>
  </div>
  )
}

export default OurServices

export const OurServicesCard = (props) => {
    const { name, desc } = props.service;
    let Icon;
    if (name === "Hackathons & Bootcamps") {
      Icon = Rocket;
    } else if (name === "School hackathons and competitions") {
      Icon = Trophy;
    } else if (name == "Jobs & Internships") {
      Icon = FileJson2;
    } else {
      Icon = Landmark;
    }
    return (
      <Card className="w-[265px] p-5 ">
        <CardBody className="flex flex-col items-center text-center overflow-hidden">
          <div className="text-primary">
            <Icon size={42} />
          </div>
          <div>
            <p className="text-xl font-medium text-center">{name}</p>
            <p className="text-sm my-5">{desc}</p>
  
            <div className="md:flex md:justify-center md:items-center md:absolute md:top-[14.8rem] w-[90%]">
              <Link
                color="primary"
                href="https://docs.google.com/document/d/1POZGiRzRmRsCbAqnyVSjbV03OBAyCThc7iIq1TwAFdQ/edit"
              >
                Learn more
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    );
}

const Services = [
    {
      name: "Hackathons & Bootcamps",
      desc: "Join various boot camps, hackathons, online courses, and meetups to boost your achievements with Hackingly",
    },
    {
      name: "School hackathons and competitions",
      desc: "Still in school? Don't worry, we at Hackingly have amazing opportunities for you, too, from small competitions to big flagship events",
    },
    {
      name: "Jobs & Internships",
      desc: "Participate in different hackathons, build projects, and get hired with Hackingly. ",
    },
    {
      name: "Startups and Funding",
      desc: " Participate in diverse startup competitions, connect with founders and investors, and secure funding through Hackingly.",
    },
  ];
