import { TabList } from "./TabList";
import { InputText } from "../InputText";
import { Button } from "../Button";


export function ProfileContainer (){
    return(
        <>
        <div className="w-full flex flex-col gap-[8px] w-full">
            <TabList texto1="Profile" src1="src/assets/icons/ProfileSmallIcon.svg" alt1="Profile"
                     texto2="Orders"  src2="src/assets/icons/PackageSmallIcon.svg" alt2="Package"
                     texto3="Settings" src3="src/assets/icons/SettingsIcon.svg" alt3="Settings"/>
            
        </div>
        
        
        </>
    )
}