import { userContext } from "../contexts/userContext";
import { PrincipalContainer } from "../components/Orders/PrincipalContainer";
import { useUserData } from "../hooks/getUserData";
import { useTitle } from "../hooks/useTitle";

export function Orders() {
    useTitle("Orders")
    const userData = useUserData()
    if(!userData) return;
    return(
        <>
            <userContext.Provider value={userData}>
                <div className="w-full min-h-[780px] pr-[16px] pl-[16px] lg:pr-[260px] lg:pb-[37px] lg:pl-[260px] lg:min-h-[1200px]">
                    <PrincipalContainer/>    
                </div>      
            </userContext.Provider>
        </>
    )

}