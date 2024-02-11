import {
  Accordion,
  AccordionItem,
  Link,
  User,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Star, Trophy, FileCode2 } from "lucide-react";
import { Code } from "@nextui-org/code";

import React from "react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { PiGlobe, PiMapPin } from "react-icons/pi";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
export default function OppDetailsTab({ opportunityData }) {
  const toolbarOptions = null;
  var renderModule = {
    // modules: {
    toolbar: false,
    // },
  };

  const renderContent = (id) => {
    switch (id) {
      case "about":
        return (
          <>
            <ReactQuill
              key={id}
              modules={renderModule}
              value={opportunityData["about"]}
              readOnly
              style={{ border: "none" }}
            />
          </>
        );
        case "jury":
          return (
            <div className="flex mb-10 items-center justify-center flex-wrap gap-10">
              {opportunityData["jury"]?.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80">
                  <div className="relative h-80 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img src={item.photo} alt="card-image" className="h-80 w-80" />
                  </div>
                  <div className="p-6">
                    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {item.name}
                    </h5>
                    <p className="text-sm font-bold">{item.description}</p>
                    <p className="block font-sans text-base antialiased text-gray leading-relaxed text-inherit">
                      {item.title}
                    </p>
                  </div>
                  <div className="p-4 pt-0">
                    <button className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-primary text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
                      <Link href={item.link} isExternal className="text-lg text-white">
                        <PiGlobe />
                        Let's Connect
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        
        case "mentors":
          return (
            <div className="flex items-center justify-center flex-wrap mb-10 gap-10">
              {opportunityData["mentors"]?.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80">
                  <div className="relative h-56 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img src={item.photo} alt="card-image" className="h-80 w-80" />
                  </div>
                  <div className="p-6">
                    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {item.name}
                    </h5>
                    <p className="text-sm font-bold">{item.description}</p>
                    <p className="block font-sans text-base antialiased text-gray leading-relaxed text-inherit">
                      {item.title}
                    </p>
                  </div>
                  <div className="p-4 pt-0">
                    <button className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-primary text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
                      <Link href={item.link} isExternal className="text-lg text-white">
                        <PiGlobe />
                        Let's Connect
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        
        case "speakers":
          return (
            <div className="flex items-center justify-center flex-wrap mb-10 gap-10">
              {opportunityData["speakers"]?.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80">
                  <div className="relative h-56 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img src={item.photo} alt="card-image" className="h-80 w-80" />
                  </div>
                  <div className="p-6">
                    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {item.name}
                    </h5>
                    <p className="text-sm font-bold">{item.description}</p>
                    <p className="block font-sans text-base antialiased text-gray leading-relaxed text-inherit">
                      {item.title}
                    </p>
                  </div>
                  <div className="p-4 pt-0">
                    <button className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-primary text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
                      <Link href={item.link} isExternal className="text-lg text-white">
                        <PiGlobe />
                        Let's Connect
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        
        case "schedule":
          return (
            <div className="m-2 mb-10">
              <ol className="relative border-s border-gray-200 dark:border-gray-700 p-5">
                {opportunityData["schedule"]?.map((item, index) => (
                  <li key={index} className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {item.start_date} to {item.end_date} || {item.location}
                      <br />
                      <Link href={item.link} isExternal className="text-sm my-2">
                        <PiMapPin size={18} />
                        {item.link}
                      </Link>
                    </time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          );
        
        case "rewards":
          return (
            <>
              <div className="flex flex-wrap gap-5">
                {opportunityData["rewards"]?.map((item, index) => (
                  <div key={index} className="w-fit flex flex-row items-center max-w-[300px] p-3 rounded-md bg-white/40 border border-gray-200">
                    <div className="flex flex-row items-center gap-3 p-4">
                      <div className="text-primary">
                        <Trophy size={42} />
                      </div>
                    </div>
        
                    <div className="flex-1">
                      <h2 className="text-base font-medium"> {item.title}</h2>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          );
        
      case "faqs":
        return (
          <div className="mb-10">
            <Accordion>
              {opportunityData["faqs"]?.map((item) => {
                return (
                  <AccordionItem
                    key={item.question}
                    aria-label={item.question}
                    title={item.question}
                  >
                    {item.answer}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        );
      case "rules":
        return (
          <>
            <ReactQuill
              modules={renderModule}
              value={opportunityData["rules"]}
              readOnly
              style={{ border: "none" }}
            />
          </>
        );
      case "terms_and_conditions":
        return (
          <>
            <ReactQuill
              modules={renderModule}
              value={opportunityData["terms_and_conditions"]}
              readOnly
              style={{ border: "none" }}
            />
          </>
        );
        case "sponsors":
          return (
            <div className="flex mb-10 flex-row flex-wrap gap-5">
              {opportunityData["sponsors"]?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-[160px] h-[150px]"
                    />
                    <h4 className="font-semibold">{item.name}</h4>
                  </div>
                );
              })}
            </div>
          );
        
        case "partners":
          return (
            <div className="flex mb-10 flex-row flex-wrap gap-5">
              {opportunityData["partners"]?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-[160px] h-[150px]"
                    />
                    <h4 className="font-semibold">{item.name}</h4>
                  </div>
                );
              })}
            </div>
          );
        
        case "problem_statement":
          return (
            <div className="flex mb-10 flex-col flex-wrap gap-5">
              {opportunityData["problem_statements"]?.map((item, index) => {
                const tagsString = item.tags;
                const tagsArray = tagsString.split(",");
                return (
                  <div key={index} className="flex flex-row items-center p-3 rounded-md bg-white/40 border border-gray-200">
                    <div className="flex flex-row items-center gap-3 p-4">
                      <div className="text-primary">
                        <FileCode2 size={42} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base font-medium">
                        {item.title} || {item.code}
                      </h2>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <Link href={item.link} isExternal className="text-sm my-2">
                        <PiMapPin size={18} />
                        Meet Link
                      </Link>
                      <div className="flex gap-2 mt-3">
                        {tagsArray?.map((tag, index) => (
                          <Code key={index}>{tag}</Code>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        
        return (
          <>
            <div className="flex mb-10 flex-col flex-wrap gap-5">
              {opportunityData["problem_statements"]?.map((item, index) => {
                const tagsString = item.tags;
                const tagsArray = tagsString.split(",");
                return (
                  <div className=" flex flex-row items-center  p-3 rounded-md bg-white/40 border border-gray-200">
                    <div className="flex flex-row items-center gap-3 p-4">
                      <div className="text-primary">
                        <FileCode2 size={42} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-base font-medium">
                        {" "}
                        {item.title} || {item.code}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      <Link
                        href={item.link}
                        isExternal
                        className="text-sm my-2"
                      >
                        <PiMapPin size={18} />
                        Meet Link
                      </Link>
                      <div className="flex gap-2 mt-3">
                        {tagsArray?.map((tag, index) => (
                          <Code key={index}>{tag}</Code>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        {opportunityDetailsTab?.map((tab) => {
          const content = opportunityData[tab.id];
          if (content === null || content === undefined) return null;
          return (
            <RenderSection key={tab.id} title={tab.title}>
              {renderContent(tab.id, content)}
            </RenderSection>
          );
        })}
      </div>
    </>
  );
}

const RenderSection = ({ title, children }) => {
  return (
    <>
      <h3 className="text-xl font-medium text-primary mb-5">{title}</h3>
      <div>{children}</div>
    </>
  );
};

const opportunityDetailsTab = [
  {
    id: "about",
    // title: "About",
  },

  {
    id: "problem_statement",
    title: "Problem Statement",
  },
  {
    id: "schedule",
    title: "Schedule",
  },

  {
    id: "rules",
    title: "Rules",
  },
  {
    id: "rewards",
    title: "Rewards",
  },
  {
    id: "jury",
    title: "Jury",
  },
  {
    id: "mentors",
    title: "Mentors",
  },
  {
    id: "speakers",
    title: "Speakers",
  },
  {
    id: "sponsors",
    title: "Sponsors",
  },
  {
    id: "partners",
    title: "Partners",
  },
  {
    id: "faqs",
    title: "FAQs",
  },
  {
    id: "terms_and_conditions",
    title: "Terms and Conditions",
  },
];
