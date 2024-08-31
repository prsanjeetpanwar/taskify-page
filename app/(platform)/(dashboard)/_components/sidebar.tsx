"use client";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Navitem ,Organization} from "./navitem";

interface SidebarProps {
    storageKey?: string;
}


export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    );
    const { organization: activeOrganization, isLoaded: isLoadedOrg } =
        useOrganization();
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key);
            }
            return acc;
        },
        []
    );



    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id],
        }));
    };

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
            <div className="flex items-center justify-between mb-2 ">
            <Skeleton className="h-10 w-[100%]" />

            </div>
            <div className="space-y-2">
                <Navitem.Skeleton/>
                <Navitem.Skeleton/>
                <Navitem.Skeleton/>
                


            </div>
            </>

        )
    }

    return (
        <>
            <div className="font-medium text-[14px] flex items-center mb-1">
                <span className="pl-4 pb-2">Workspaces</span>

            </div>
            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-2"

            >
                {userMemberships.data.map(({ organization }) => (
                    <Navitem
                        key={organization.id}
                        isActive={activeOrganization?.id===organization.id}
                        organization={organization as Organization}
                        onExpand={onExpand}
                        isExpanded={expanded[organization.id]}


                    
                    />
                ))}

            </Accordion>
        </>

    );
};
