import { useContext } from "react";
import { PersonCardName } from "./PersonCardName";
import { ProfileContainer } from "./ProfileContainer";
import { TabList } from "./TabList";
import { userContext } from "../../contexts/userContext";

export function PrincipalContainer(){
    const user = useContext(userContext)
    return(
        <>
            <div className="flex max-w-[1400px] flex-col items-center justify-start gap-[32px] mt-[32px] pr-[16px] mb-[32px] pl-[16px] ">
            <PersonCardName name={`${user?.firstName} ${user?.lastName}`} email={user?.email} orders={user?.totalOrders} memberSince={` ${user?.memberSince ? new Date(user.memberSince).toISOString().split('-')[0] : 'Unknown'} ` }/>
            <ProfileContainer/>
            

            </div>
        </>
    )

}