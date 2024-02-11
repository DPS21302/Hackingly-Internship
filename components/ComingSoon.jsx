import Link from "next/link";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex gap-2 h-screen flex-col mx-auto justify-center items-center text-5xl text-primary">
      Coming Soon
      <Link
        href="/"
        className="bg-gradient-to-r p-4 mt-20 rounded-lg  from-[#ff4721] to-[#ffa52b] text-white "
      >
        Home
      </Link>
    </div>
  );
};

export default ComingSoon;
