import { EntranceBoxExtended } from "../components/EntranceBoxExtended";
import { Header } from "../components/Header";

export function SignUp() {
    return (
        <>  
            <Header/>
            <div className="w-full mt-[48px] pr-[16px] pl-[16px] mb-[48px] flex items-center justify-center bg-gradient-to-br from-[rgba(243,244,246,0.3)] to-[rgba(243,244,246,0.1)]">
                <EntranceBoxExtended />

            </div>
        </>
    )
}