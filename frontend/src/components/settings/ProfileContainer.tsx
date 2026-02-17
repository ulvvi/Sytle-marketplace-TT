import { TabList } from "./TabList";
import { ContentBox } from "./ContentBox";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { SwitchButton } from "./SwitchButton";

interface ProfileContainerProps {
    orders?: number
    wishlist?: number
    rating?: number
}

export function ProfileContainer (  ){
    return(
        <>
        <div className="w-full flex flex-col gap-[8px] w-full">
            <TabList texto1="Profile" src1="src/assets/icons/ProfileSmallIcon.svg" alt1="Profile"
                     texto2="Orders"  src2="src/assets/icons/PackageSmallIcon.svg" alt2="Package"
                     texto3="Settings" src3="src/assets/icons/SettingsIcon.svg" alt3="Settings"/>
            <div className="flex flex-col gap-[24px]">
                <ContentBox title="Notification Preferences" titleIconSrc="src/assets/icons/notificationIcon.svg">
                        <SwitchButton label="Email Notifications" message="Receive notifications via email"/>
                        <SwitchButton label="SMS Notifications" message="Receive notifications via text message"/>
                        <SwitchButton label="Marketing Emails" message="Receive promotional emails and offers"/>
                        <SwitchButton label="Order Updates" message="Get notified about order status changes"/>
                        <SwitchButton label="New Arrivals" message="Be the first to know about new products"/>
                        <SwitchButton label="Sales Alerts" message="Get notified about sales and discounts"/>
                </ContentBox>

                <ContentBox title="Account Security" titleIconSrc="src/assets/icons/securityIcon.svg">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col min-w-[164px] items-start">
                        <h2 className="text-[16px]/5 font-semibold">Change Password</h2>
                        <span className="text-[14px]/5 text-tertiary">Update your account Password</span>
                    </div>
                    <Button texto="Update Password" buttonClassName="!h-40px !w-[144px]" color="white"/>
                </div>

                </ContentBox>
            </div>
        </div>
        
        
        </>
    )
}