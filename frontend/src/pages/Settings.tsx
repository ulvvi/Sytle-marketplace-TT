
import { PrincipalContainer } from "../components/settings/PrincipalContainer";
import { userContext } from "../contexts/userContext";
import { useUserData } from "../hooks/getUserData";

export function Settings () {

    const userData = useUserData();
    if(!userData) return;
    
    return(
        <>
            <userContext.Provider value={userData}>
                <div className="w-full min-h-[780px] lg:pr-[260px] lg:pb-[346px] lg:pl-[260px] lg:min-h-[1200px]">
                    <PrincipalContainer/>    
                </div>
            </userContext.Provider>
        </>
    )
}