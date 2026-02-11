import { useNavigate } from "react-router-dom"
import { useState } from 'react';

export function TabList(){

    const navigate = useNavigate();

    const [actualSection, setActualSection] = useState("Profile");

    return(

        <>
            <nav className="flex p-[4px] bg-[#F3F4F6] rounded-[14px] w-full">
                <button className={` ${actualSection === "Profile"? "bg-secondary font-semibold" : "bg-[#F3F4F6] text-tertiary " } pt-[6px] pr-[10.5px] pb-[6px] pl-[18.5px] cursor-pointer rounded-[8px] text-[14px] w-full` }  onClick={() => {navigate('/Profile'); setActualSection("Profile")}}>
                    Profile
                </button>
                <button className={` ${actualSection === "Orders"? "bg-secondary font-semibold" : "bg-[#F3F4F6] text-tertiary " } pt-[6px] pr-[10.5px] pb-[6px] pl-[18.5px] cursor-pointer rounded-[8px] text-[14px] w-full` } onClick={() => {navigate('/Orders'); setActualSection("Orders")}}>
                    Orders
                </button>
                <button className={` ${actualSection === "Settings"? "bg-secondary font-semibold" : "bg-[#F3F4F6] text-tertiary " } pt-[6px] pr-[10.5px] pb-[6px] pl-[18.5px] cursor-pointer rounded-[8px] text-[14px] w-full` } onClick={() => { navigate('/Settings'); setActualSection("Settings")}}>
                    Settings
                </button>
            </nav>
        </>

    )
}