"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"



export const MobileSidebar = () => {
    const pathName = usePathname()
    const [isMounted, setIsMounted] = useState(false)



    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)
    const isOpen = useMobileSidebar((state) => state.isOpen)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        onClose()

    }, [pathName, onClose])

    if (!isMounted) {
        return null
    }
    return (
        <>
            <Button onClick={onOpen}
                size="sm"
                className="block md:hidden mr-4"
                variant='ghost'
            >
                <Menu className="h-4 w-4" />
            </Button>
          <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <Sidebar  
                storageKey="t-sidebar-mobile-state"


                />
            </SheetContent>
          </Sheet>
        </>
    )
}