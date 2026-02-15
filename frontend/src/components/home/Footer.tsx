import { Button } from "../Button";
import { InputText } from "../InputText";

interface footerProps{
    footerStyle?: "Sales"
}

export function Footer({footerStyle} : footerProps) {
    const isSales = footerStyle === "Sales";
    const hText = isSales? "Don't Miss Future Sales!" : "Stay in Style"
    const pText : string= isSales? "Subscribe to our newsletter and be the first to know about exclusive sales and special offers."
        : "Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips."
    return (
        <>
            <footer className={`${isSales ? 'bg-linear-to-r  from-red-grad  to-pink-grad' : 'bg-primary'} h-97.5 flex flex-col justify-center px-4 lg:h-88 `}>
                <div className="flex flex-col gap-4 lg:items-center">
                    <h2 className="text-secondary text-center text-[2.25rem] font-bold">{hText}</h2>
                    <p className="text-secondary text-center opacity-90 text-[1.25rem] lg:w-2xl lg:max-w-2xl">{pText}</p>
                    <div className="mt-4 flex flex-col gap-4 
                    lg:flex-row lg:items-center lg:justify-center lg:w-md lg:max-w-md border-secondary">
                        <div>
                            <InputText texto="Enter your email" icone={undefined} inputClassName="bg-secondary h-[48px] rounded-[12px] lg:w-[306px]"/>
                        </div>
                        <Button texto="Subscribe" color="white" link="" buttonClassName="h-[44px] hover:bg-[#F3F4F6]/80 lg:w-[126px]"/>
                    </div>
                </div>
            </footer>
        </>
    )
}
