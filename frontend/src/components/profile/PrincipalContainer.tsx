import { PersonCardName } from "./PersonCardName";
import { ProfileContainer } from "./ProfileContainer";
import { TabList } from "./TabList";

export function PrincipalContainer(){
    return(
        <>
            <div className="flex flex-col items-center justify-start gap-[32px] mt-[32px] pr-[16px] mb-[32px] pl-[16px]">
            <PersonCardName name={"Jhon Doe"} email={"john.doe@example.com"} orders={2} memberSince={2023}/>
            <ProfileContainer/>
            

            </div>
        </>
    )

}