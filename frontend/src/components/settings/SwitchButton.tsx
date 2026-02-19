import { useState } from "react"

interface SwitchButtonProps{
    label?: string
    message?: string
    name: string
    checked?: boolean
    onChange: (name:string, newValue: boolean) => void
}

export function SwitchButton({label="Default label",message="default message", checked, name, onChange} :SwitchButtonProps) {

    //const [activated,setActivated] = useState(checked);

    return(
        <>

        

        <div className="flex item-center justify-between w-full">
            <div className="flex flex-col">
                <h1 className="text-[16px]/6 font-semibold">
                    {label}
                </h1>
                <span className="text-[14px]/5 text-tertiary">
                    {message}
                </span>
            </div>

            <div className=" flex flex-col items-center justify-center ">
                <button  onClick={()=> onChange(name, !checked)}className={`w-[44px] h-[24px] pt-[2px] pb-[2px] pr-[2px] pl-[2px] rounded-full flex flex-col items-center cursor-pointer transition-colors duration-300 ease-in-out ${!checked ?  "bg-[#E5E7EB]"  : "bg-black" } `}>
                    <div className={`w-[20px] h-[20px] self-end rounded-full bg-white shadow-[0px_10p_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-transform duration-300 ${!checked ? "-translate-x-5" : ""}`}></div>
                </button>


            </div>
        </div>
        </>
    )
}