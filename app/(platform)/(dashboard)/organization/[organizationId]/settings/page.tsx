"use client"
import { OrganizationProfile } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
const SettingsPage=()=>{
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        const timer= setTimeout(()=>{
            setIsLoading(false)
        },1000)

        return ()=>clearTimeout(timer)
    },[])

 return (
    <div className="w-full">
      {isLoading ? (
        <div>
          <Skeleton className="h-96 w-full mt-4" /> 
        </div>
      ) : (
        <OrganizationProfile
          routing="hash"
          appearance={{
            elements: {
              rootBox: {
                boxShadow: 'none',
                width: "100%",
              },
              card: {
                border: "1px solid #e5e5e5",
                boxShadow: "none",
                width: "100%",
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default SettingsPage;