"use client";
import axios from "axios";
import { baseURL } from "@/utils/BaseURL";
import Loading, {GettingData} from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// import toast, { Toaster } from 'react-hot-toast';
import UpdateUserDetailsForm from "@/components/forms/UpdateUserDetailsForm";



const ProfileUpdateForm = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseURL}/profile/`, {
        headers: {
          Authorization: `Bearer ${session?.user?.data?.access}`,
        },
      });

      setUserData(response.data.data);

    } catch (error) {
      console.error("Error Getting profile:", error);
    }
  };


  useEffect(()=>{
    console.log("Status: ", status);
    if(!session && status==="unauthenticated"){
      router.push("/login")
    }
  },[status, router]);

  useEffect(() => {

    if(status==="authenticated"){
      fetchUserData();
    }
  }, [session?.user?.data?.access]);

  if (status === "loading" || status==="unauthenticated" ) {return <Loading />;}

  else if (status === "authenticated" && userData.length === 0) {return <GettingData />;}
  return (
    <div >
      <UpdateUserDetailsForm userData={userData}/>
    </div>
  );
};

export default ProfileUpdateForm;
