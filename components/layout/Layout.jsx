"use client";
import Footer from "./Footer";
import PrimaryNavbar from "./PrimaryNavbar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { setToken } from "@/provider/redux/authSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";
  const OragnizeEvent = pathname === "/organize-event";

  const Support = pathname === "/support";

  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useLayoutEffect(() => {
    if (session && status === "authenticated") {
      dispatch(setToken(session.user.data.access));
    }
  }, [dispatch]);
  return (
    <>
      <main>
        <div
          className={`z-50 fixed min-w-full  ${
            isScrolled ? "bg-[#6754e3]" : "bg-transparent text-current"
          }`}
        >
          <PrimaryNavbar />
        </div>
        <div>
          <Toaster />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
};

export { Layout };
