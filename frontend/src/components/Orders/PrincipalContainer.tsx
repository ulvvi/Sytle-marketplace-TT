import { ContentBox } from "./ContentBox";
import { Order } from "./Order";
import { PersonCardName } from "./PersonCardName";
import { ProfileContainer } from "./ProfileContainer";
import { TabList } from "./TabList";

export function PrincipalContainer(){
    return(
        <>
            <div className="flex max-w-[1400px] flex-col items-center justify-start gap-[32px] mt-[32px] mb-[32px] ">
            <PersonCardName name={"Jhon Doe"} email={"john.doe@example.com"} orders={2} memberSince={2023}/>
            </div>
            <div className="flex flex-col items-center gap-[8px]~w-full">
                <ProfileContainer/>
                <div className="flex flex-col items-center gap-[24px] w-full">
                    <ContentBox title="Order History" titleClassName="!font-bold" 
                    className="!border-none shadow-none !pt-[4px] !pr-0 !pb-0 !pl-0"
                    buttonName="Export Orders" buttonLink="/Orders" buttonColor="white" buttonIconSrc="src/assets/icons/downloadIcon.svg"
                    buttonIconPos="left" buttonClassName="!w-[155px]">
                    
                    </ContentBox>
                    <Order/> 
                </div>
                
            </div>
            
            
        </>
    )

}