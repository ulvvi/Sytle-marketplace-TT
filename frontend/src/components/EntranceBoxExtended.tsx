import { ButtonIntegration } from "./ButtonIntegration"
import { InputText } from "./InputText"
import { Link } from "react-router"
import { Button } from "./Button"

export function EntranceBoxExtended() {
    return (
        <>
            <div className=" max-w-[448px] h-[748px] md:h-[704px] flex flex-col items-center gap-[32px]">
                <div className="w-full flex flex-col items-center justify-start gap-[8px] ">
                    <div>
                        <div className="flex gap-[8px] items-center justify-center">
                            <img src="src/assets/icons/styleLogo.svg" alt="Logo" />
                                
                            
                            <div className="flex">
                                <span className="text-black font-bold text-[1.5rem]">
                                    STYLE
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="items-center text-tertiary">   
                        <span>Create your account and start shopping</span>
                    </div>

                </div>

                <div className="w-full flex flex-col items-center justify-start shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)] rounded-[12px]">
                    <div className="w-full flex flex-col items-start justify-start p-[24px]">
                        <div className="w-full flex flex-col items-center ">
                            <h1 className="text-[1.5rem] h-[32px] font-bold">
                                Create Account
                            </h1>

                            <div className="pt-[4px] flex flex-col items-center justify-center">
                                <span className="text-tertiary text-center text-[16px]">Join our community and discover amazing fashion</span>
                            </div>
                                
                            <div className="">
                                <div className="gap-[12px]">
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[24px] w-full pb-[24px] pl-[24px] pr-[24px]">
                        <div className="w-full  gap-[12px] flex flex-col items-center justify-center">
                            <ButtonIntegration icone="src/assets/icons/googleLogo.svg" texto="Continue with Google" link="/google" />
                            <ButtonIntegration icone="src/assets/icons/facebookLogo.svg" texto="Continue with Facebook" link="/facebook" />

                        </div>

                        <div className="w-full relative flex items-center justify-center gap-[12px]">

                            <div className="absolute flex items-center w-full  z-1">
                                <hr className="w-full border-t border-gray-300" />
                            </div>

                            <div className="pr-[8px] pl-[8px] z-10 bg-white items-center justify-center flex">
                                <span className="text-tertiary text-[12px] ">OR CONTINUE WITH EMAIL</span>
                            </div>
                            
                        </div>
                        <div className="flex  gap-[16px]">
                            <InputText icone="./src/assets/icons/userIcon.svg" texto="First Name" isPassword={false} label="First Name"/>
                            <InputText texto="Last Name" isPassword={false} label="Last Name"/>
                        </div>
                        <InputText icone="./src/assets/icons/emailIcon.svg" texto="Enter your Email" isPassword={false} label="Email Address"/>
                        <div className="relative flex flex-col items-start w-full gap-[8px]">
                            <InputText icone="./src/assets/icons/passwordIcon.svg" texto="Create a password" isPassword={true} label="Password"/>    
                            <span className="text-[12px] text-tertiary">Must be at least 8 characters long</span>
                        </div>
                        <InputText icone="./src/assets/icons/passwordIcon.svg" texto="Confirm your password" isPassword={true} label="Confirm Password"/>
                        {/*Começo da checkbox*/}
                        <div className="flex flex-col gap-[12px]">
                            <label className="flex items-center space-x-2">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="peer appearance-none h-[16px] w-[16px] border-2 border-primary rounded-full checked:bg-primary transition-all cursor-pointer" />
                                    
                                    <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                                        xmlns="http://www.w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="ml-[8px] text-[14px] text-primary font-semibold">I agree to the  <Link to="/register" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link to="/register" className="font-semibold text-primary hover:underline">Privacy Policy</Link></span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="peer appearance-none h-[16px] w-[16px] border-2 border-primary rounded-full checked:bg-primary transition-all cursor-pointer" />
                                    
                                    <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                                        xmlns="http://www.w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="ml-[8px] text-[14px] text-primary font-semibold">Subscribe to our newsletter for exclusive offers and updates</span>
                            </label>
                        </div>
                        
                       {/*Fim da checkbox*/}

                        <Button texto="Create Account" link="/" color="default"/>
                        <span className="text-[14px] text-tertiary">Already have an account? <Link to="/register" className="font-semibold text-primary hover:underline">Sign In</Link></span>

                    </div>
                </div>
                
                
            </div>



        </>
    )
}