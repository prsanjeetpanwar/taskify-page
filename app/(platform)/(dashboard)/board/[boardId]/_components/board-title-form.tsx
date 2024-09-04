"use client"
import { ElementRef, use, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Board } from "@prisma/client"
import { FormInput } from "@/components/form/form-input"

import { updateBoard } from "@/actions/update-board"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"

interface BoardTitleFormProps {
    data: Board
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
    const {execute}=useAction(updateBoard,{
        onSuccess:(data)=>{
            toast.success(`Board ${data.title} updated successfully`);
            setTitle(data.title)
            disableEditing()
        },
        onError:(error)=>{
            toast.error(error)
        }
        
    })
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(data.title)
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)



    const disableEditing = () => {
        setIsEditing(false)
    }
    const OnBlur=()=>{
       formRef.current?.requestSubmit() 
    };



    const OnSubmit=(formData:FormData)=>{
        const title = formData.get("title") as string;
        execute({
            title,
            id: data.id
        })
    }

    const EnableEditing = () => {
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select()
        })
    }

    if (isEditing) {
        return (
            <form action={OnSubmit} ref={formRef} className="flex items-center gap-x-2">
                <FormInput ref={inputRef} id="title" onBlur={OnBlur}
                    defaultValue={title}
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent
                               focus-visible:outline-none focus-visible:ring-transparent
                               border-none"/>
            </form>
        )
    }

    return (
        <Button
            onClick={EnableEditing}
            variant="transparent" className="font-bold text-lg h-auto w-auto p-1 px-2">
            {title}
        </Button>
    )
};

