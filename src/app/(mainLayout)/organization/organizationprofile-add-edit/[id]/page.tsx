"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/@/redux/store";
import { fetchSingleOrganization } from "@/@/redux/slices/organizationProfileSlice";
import OrganizationForm from "../page";

const OrganizationProfileUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOrganization(id as string));
    }
  }, [id]);

  return (
    <div>
      <OrganizationForm />
    </div>
  );
};

export default OrganizationProfileUpdate;
