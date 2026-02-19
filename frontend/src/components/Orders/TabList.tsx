import { useNavigate } from "react-router-dom"
import { useState } from 'react';

interface TabListProp{
    texto1?: string;
    src1?: string;
    alt1?: string;
    texto2?: string;
    src2?: string;
    alt2?: string;
    texto3?: string;
    src3?: string;
    alt3?: string;

}


export function TabList({texto1,src1,alt1,texto2,src2,alt2,texto3,src3,alt3}:TabListProp){

    const navigate = useNavigate();

    const [actualSection, setActualSection] = useState("Orders");

    return(

        <>
            <nav className="flex p-[4px] bg-[#F3F4F6] rounded-[14px] w-full">
                <button className={` ${actualSection === "Profile"? "bg-secondary font-semibold cursor-default" : "bg-[#F3F4F6] text-tertiary hover:bg-[#d9d9da4e]" } pt-[6px] pr-[10.5px] pb-[6px] pl-[18.5px] cursor-pointer rounded-[8px] text-[14px] w-full ` }  onClick={() => {navigate('/Profile'); setActualSection("Profile")}}>
                    <div className="flex items-center self-center justify-center w-full gap-[8px]">
                        <img src={src1} alt={alt1} className={` ${src1 ? "inline-block" : "hidden"}`}/>
                        <span className="self-center"> {texto1} </span>
                    </div>
                </button>
                <button className={` ${actualSection === "Orders"? "bg-secondary font-semibold" : "bg-[#F3F4F6] text-tertiary hover:bg-[#d9d9da4e]" } pt-[6px] pr-[10.5px] pb-[6px] pl-[18.5px] cursor-pointer rounded-[8px] text-[14px] w-full` } onClick={() => {navigate('/Orders'); setActualSection("Orders")}}>
                    <div className="flex items-center self-center justify-center w-full gap-[8px]">
                        <img src={src2} alt={alt2} className={` ${src2 ? "inline-block" : "hidden"}`}/>
                        <span className="self-center"> {texto2} </span>
                    </div>
                </button>
                <button className={` ${actualSection === "Settings"? "bg-secondary font-semibold" : "bg-[#F3F4F6] text-tertiary hover:bg-[#d9d9da4e]" } pt-[6px] pr-[10.5px] pb-[6px] pl-[18.5px] cursor-pointer rounded-[8px] text-[14px] w-full` } onClick={() => { navigate('/Settings'); setActualSection("Settings")}}>
                    <div className="flex items-center self-center justify-center w-full gap-[8px]">
                        <img src={src3} alt={alt3} className={` ${src3 ? "inline-block" : "hidden"}`}/>
                        <span className="self-center"> {texto3} </span>
                    </div>
                </button>
            </nav>
        </>

    )
}