import { TabList } from "./TabList";
import { ContentBox } from "./ContentBox";
import { InputText } from "../InputText";
import { Button } from "../Button";

interface ProfileContainerProps {
    orders?: number
    wishlist?: number
    rating?: number
}

export function ProfileContainer ({orders = 3,wishlist = 4,rating = 4.8}:ProfileContainerProps){
    return(
        <>
        <div className="w-full flex flex-col gap-[8px] w-full">
            <TabList/>
            <div className="flex flex-col gap-[24px]">

            
                <ContentBox title="Personal Information" buttonColor="white" buttonName="Cancel" buttonIconSrc="src/assets/icons/pencilIcon.svg" buttonIconPos="left" buttonIconAlt="pencil" buttonLink="/" >
                <div className="w-full gap-[24px] flex flex-col lg:grid lg:grid-cols-2">
                    <InputText label="First Name" type="text" textClassName="text-primary"/>
                    <InputText label="Last Name" type="text" textClassName="text-primary"/>
                    <InputText label="Email" type="email" textClassName="text-primary"/>
                    <InputText label="Phone" type="tel" textClassName="text-primary"/>
                    <InputText label="Date of Birth" type="date" textClassName="text-primary"/>
                    <InputText label="Gender" texto="Gender" textClassName="text-primary" options={[
                        {label: "Male", value:"male"},
                        {label: "Female", value:"female"}
                    ]}/>
                        <div className="flex items-end justify-start w-full pt-[16px] gap-[16px]">
                            <Button texto="Save Changes" link="/Profile" buttonClassName="!w-[120px]"/>    
                            <Button texto="Cancel" link="/Profile" color="white" buttonClassName="!w-[76px]"/>
                        </div>
                </div>
                    
                    
                </ContentBox>
                <div className="w-full gap-[24px] flex flex-col lg:flex-row">

                
                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/packageIcon.svg" alt="package" />
                        <span className="text-[24px]/8 font-bold">{orders}</span>
                        <span className="text-[14px]/5 text-tertiary">Total Orders</span>
                    </div>
                </ContentBox>

                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/redHeartIcon.svg" alt="Heart" />
                        <span className="text-[24px]/8 font-bold">{wishlist}</span>
                        <span className="text-[14px]/5 text-tertiary">Whishlist Items</span>
                    </div>
                </ContentBox>

                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/yellowStartIcon.svg" alt="Star" />
                        <span className="text-[24px]/8 font-bold">{rating}</span>
                        <span className="text-[14px]/5 text-tertiary">Avg. Rating</span>
                    </div>
                </ContentBox>
                </div>
            </div>
        </div>
        
        
        </>
    )
}