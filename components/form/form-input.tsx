"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FormErrors } from "./form-error"

interface FormInputProps {
    id?: string,
    label?: string,
    type?: string,
    name?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    errors?: Record<string, string[] | undefined>,
    className?: string,
    defaultValue?: string,
    onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    name,
    errors,
    className,
    defaultValue = "",
    onBlur

}, ref) => {
    const { pending } = useFormStatus();

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {
                    label ? (
                        <Label htmlFor={id}
                        className="text-xs  font-semibold text-neutral-700"
                        >
                            Board title
                        </Label>
                    ) : null

                }
                <Input
                onBlur={onBlur}
                defaultValue={defaultValue}
                ref={ref}
                required={required}
                name={id}
                disabled={pending || disabled}
                id={id}
                type={type}
                placeholder={placeholder}
                className={cn(
                    "text-sm px-2 py-1 h-7 ",
                    className
                )}
aria-describedby={`${id}-error`}

                />
            </div>
            <FormErrors
              id="title"
            errors={errors}
            />
        </div>
    )
})


FormInput.displayName = "FormInput"