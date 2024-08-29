import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localfont from 'next/font/local'
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const headingFont = localfont({
    src: '../../public/fonts/font.woff2',

})

const textfont = Poppins({
    subsets: ['latin'],
    weight: [
        '100',
        '300',
        '500',
        '200',
        '600',
        '400',
        '700',
        '800',
        '900'

    ]
})


const MarketingPage = () => {
    return (
        <>
            <div className="items-center  flex justify-center flex-col">
                <div className={cn("flex items-center justify-center flex-col",
                    headingFont.className
                )}>
                    <div className="flex items-center mb-4 border shadow-sm p-4 rounded-full uppercase bg-amber-100 text-amber-700">
                        <Medal className="h-6 w-6 mr-2 " />
                        No.1 task management
                    </div>
                    <h1 className="text-3xl md:text-6xl text-center text-neutral-800
mb-6">Taskify helps team move </h1>



                    <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600  text-white px-4 p-2 rounded-md">
                        Work forward
                    </div>
                </div>
                <div className={cn(" text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto ",
                    textfont.className
                )}>
                    Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique- accomplish it all with Taskify
                </div>
                <Button className="mt-6" size='lg' asChild >
                    <Link
                        href="/">
                        Get Taskify for free
                    </Link>

                </Button>

            </div>
        </>
    )
}


export default MarketingPage;