
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

const headingfont=localFont({
    src: '../public/fonts/font.woff2',


})
export const Logo =()=>{

    return (
        <Link href='/'>
            <div className="hover:opacity-75 items-center transition
            ga0-x-2 hidden md:flex">
                <Image
                    src="/logo (2).png"
                    alt="Taskify"
                    width={50}
                    height={50}
                    className="cursor-pointer"
                 />
                 <p className={cn("text-xl text-neutral-700 ")}>Taskify</p>
            </div>

        </Link>
    )
}