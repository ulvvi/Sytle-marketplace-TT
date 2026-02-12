import { TabList } from "./TabList";
import { ContentBox } from "./ContentBox";

export function ProfileContainer (){
    return(
        <>
        <div className="w-full flex flex-col gap-[8px]">
        <TabList/>
        <ContentBox buttonColor="white" buttonName="Cancel" buttonIconPos="left" buttonIconSrc="src/assets/icons/pencilIcon.svg">
            
        </ContentBox>
        </div>
        
        
        
        </>
    )
}