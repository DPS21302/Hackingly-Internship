"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import OpportunitiesSection from "./OpportunitiesSection";
import CompanyOverviewSection from "./CompanyOverviewSection";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "@/utils/BaseURL";
import axios from "axios";
import { listOpportunity } from "@/provider/redux/listOppSlice";
import useLoading from "@/hooks/useLoading";
import { fetchUser } from "@/provider/redux/userProfileSlice";
import Loading from "../Loading";
import { fetchOrgDetails } from "@/provider/redux/orgDetailsSlice";
import { fetchOrgUsers } from "@/provider/redux/orgUserSlice";
import toast from "react-hot-toast";

const Homepage = ({ orgId }) => {
  // console.log("orgId", orgId);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [organizationUser, setOrganizationUser] = useState([]);
  const listOpp = useSelector((state) => state.listOpp?.data?.data);
  const userData = useSelector((state) => state.userProfile.userProfile?.data);
  const userLoad = useSelector((state) => state.userProfile.loading);
  const orgStatus = useSelector((state) => state.orgDetails.orgDetails?.data);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useLayoutEffect(() => {
    const fetchData = async () => {
      // startLoading();

      try {
        const orgUserResponse = await axios.get(
          `${baseURL}/organization/${orgId}/users/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.data?.access}`,
            },
          }
        );

        // console.log("orgUser", orgUserResponse.data);
        setOrganizationUser(orgUserResponse.data.data);

        dispatch(fetchUser(session?.user?.data?.access));
        dispatch(fetchOrgDetails(orgId, session?.user?.data?.access));
        dispatch(listOpportunity());
      } catch (error) {
        toast.error(error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [orgId, dispatch, session?.user?.data?.access, startLoading, stopLoading]);

  if (status === "loading" || isLoading || userLoad === true)
    return <Loading />;

  return (
    <div className="layoutBox">
      <div className="pt-20 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[70%]">
          <OpportunitiesSection
            orgData={orgStatus}
            userData={userData}
            opportunities={listOpp}
            organizationUser={organizationUser}
          />
        </div>
        <CompanyOverviewSection orgData={orgStatus} />
      </div>
    </div>
  );
};

export default Homepage;
