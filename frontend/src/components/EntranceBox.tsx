export function EntranceBox() {
    return (
        <>
            <div className=" max-w-[448px] h-[748px] md:h-[704px] flex flex-col items-center gap-[32px]">
                <div className="w-full flex flex-col items-center justify-start gap-[8px] ">
                    <div>
                        <div className="flex gap-[8px] items-center justify-center">
                            <img src="src/assets/icons/styleLogo.svg" alt="Logo" />
                                
                            
                            <div className="flex">
                                <span className="text-black font-bold;
]">
                                    STYLE
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="items-center text-tertiary">   
                        <span>Welcome back to your account</span>
                    </div>

                </div>

                <div className="w-full flex flex-col items-center justify-start border">
                    <div className="w-full flex flex-col items-start justify-start p-[24px]">
                        <div className="w-full flex flex-col items-center ">
                            <h1 className="text-[1.5rem] h-[32px]">
                                Sign In
                            </h1>

                            <div className="pt-[4px] flex flex-col items-center justify-center">
                                <span className="text-tertiary text-center text-[16px]">Enter your credentials to access your account</span>
                            </div>
                                
                            <div className="">
                                <div className="gap-[12px]">
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>

        </>
    )
}