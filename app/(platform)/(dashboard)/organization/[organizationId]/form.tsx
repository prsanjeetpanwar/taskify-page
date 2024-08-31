"use client"
import { CreateBoards } from "@/actions/create-board/index"
import { FormInput } from "./form-input"
import { FormButton } from "./form-button"
import { useAction } from "@/hooks/use-action"

export const Form = () => {
  const {execute,fieldErrors}=useAction(CreateBoards,
    {
        onSuccess:(data)=>{
            console.log(data);
            
          },
          onError:(error)=>{
            console.log(error);
             
          }

    }
  );
 

  const onSubmit=(formData:FormData)=>{
const title=formData.get("title") as string

execute({title})


  }
    return (
        <form action={onSubmit}>
            <div className=" flex flex-col space-y-2">
                <FormInput error={fieldErrors} />
            </div>
            <FormButton />
        </form>
    )

}