"use client";
import Loading from "@/components/Loading";
import ProfileData from "@/components/ProfileData";
import { fetchUser } from "@/provider/redux/userProfileSlice";
import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.userProfile?.userProfile?.data);

  const router = useRouter();

  useLayoutEffect(()=>{
    console.log("Status: ", status);
    if(!session && status==="unauthenticated"){
      router.push("/login")
    }
  },[status, router]);

  useEffect(() => {
    dispatch(fetchUser(session?.user?.data?.access));
  }, [dispatch, session?.user?.data?.access]);

  
  if (status === "loading" || status==="unauthenticated") {return <Loading />;}

  return (
    <div className="pt-20 layoutBox">
      <ProfileData userData={profile} />
    </div>
  );
};

export default ProfilePage;
