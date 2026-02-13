import { Header } from "../components/Header"
import { PrincipalContainer } from "../components/profile/PrincipalContainer"

export function Profile() {
    return (
        <>  
            <Header/>
            <div className="w-full min-h-[780px] lg:pr-[260px] lg:pb-[346px] lg:pl-[260px] lg:min-h-[1200px]">
                <PrincipalContainer/>    
            </div>
            
        </>
    )
}

