"use client"

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"


import { useAction } from "@/hooks/use-action"
import { CreateBoards } from "@/actions/create-board"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"
import { X } from "lucide-react"
import { toast } from "sonner"
import { FromPicker } from "./form-picker"
import { ElementRef, useRef } from "react"
import { useRouter } from "next/navigation"

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: 'center' | "start" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    side = "bottom", align, sideOffset = 0, children
}: FormPopoverProps) => {
    const closeRef=useRef<ElementRef<"button">>(null)
    const router=useRouter()

    const { execute, fieldErrors } = useAction(CreateBoards,
        {
            onSuccess: (data) => {
                console.log({ data })
                toast.success("Board created successfully")
                closeRef.current?.click()
                router.push(`/board/${data.id}`)
            },

            onError: (error) => {
                console.log({ error })
                toast.error(error)
            }

        },

    )
    
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image=formData.get("image") as string
        execute({ title,
            image
         });
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FromPicker id="image"
                        errors={fieldErrors}
                        />
                        <FormInput id="title"
                            label="title"
                            type="text"
                            errors={fieldErrors}
                        />
                        <FormSubmit
                            className="w-full">Create
                        </FormSubmit>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}