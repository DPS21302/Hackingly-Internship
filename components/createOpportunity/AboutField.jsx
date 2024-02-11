import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AboutField({ about, setAbout }) {
  function handleAboutChange(content) {
    setAbout(content);
  }
  return (
    <>
      <h1 className="text-xl my-2 font-medium text-primary">About Event</h1>
      <ReactQuill
        className="h-[200px] my-9"
        placeholder="Describe your event in brief..."

        // value={about}
        // onChange={handleAboutChange}

      ></ReactQuill>
    </>
  );
}
