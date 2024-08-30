"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams<{ organizationId: string }>();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive || !params.organizationId) return;

    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]);

  return null;
};
