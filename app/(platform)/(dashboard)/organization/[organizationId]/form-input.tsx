"use client"

import { Input } from "@/components/ui/input"
import { useFormStatus } from "react-dom"

interface FormInputProps {
    error?: {
        title?: string[]
    }
}


export const FormInput = ({ error }: FormInputProps) => {
    const { pending } = useFormStatus()
    return (


        <div>
            <Input
                id="title"
                name="title"
                required
                placeholder="Enter a board title"
                disabled={pending}
            />
            {error?.title ? (
                <div >
                    {error.title.map((error: string) => (
                        <p key={error} className="text-rose-500">
                            {error}
                        </p>
                    ))}

                </div>

            ) : null}
        </div>

    )
}