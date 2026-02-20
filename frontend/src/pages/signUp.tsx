import { EntranceBoxExtended } from "../components/EntranceBoxExtended";
import { useTitle } from "../hooks/useTitle";

export function SignUp() {
    useTitle("Sign Up")
    return (
        <>  
            <div className="w-full mt-[48px] pr-[16px] pl-[16px] mb-[48px] flex items-center justify-center bg-gradient-to-br from-[rgba(243,244,246,0.3)] to-[rgba(243,244,246,0.1)]">
                <EntranceBoxExtended />

            </div>
        </>
    )
}