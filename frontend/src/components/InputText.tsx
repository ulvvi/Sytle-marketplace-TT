import type { ReactNode } from "react";
import { useState } from "react";

interface InputTextProps {
    icone?: ReactNode;
    texto?: string;
    isPassword?: boolean;
    label?: string;
    inputClassName?: string;
}

export function InputText({
    icone,
    texto = "Enter your text",
    isPassword = false,
    label,
    inputClassName
}: InputTextProps) {

    const [isClicked, setIsClicked] = useState(false);

    const inputType = isPassword && !isClicked ? "password" : "text";

    const renderIcone = () => {
        if (typeof icone === 'string') {
            return <img src={icone} alt={texto} className="w-[16px] h-[16px]" />;
        }
        return icone;
    };

    return (
        <div className="w-full gap-[12px] flex flex-col items-start justify-center">
            <label className={`text-[14px] text-primary font-medium ${label === undefined ? "hidden" : "block"}`}>
                {label}
            </label>
                
            <div className={`flex items-center justify-evenly border-(--border-primary) rounded-[10px] border-[1px] border-solid w-full h-[40px] gap-[13px] px-[12px] ${inputClassName}`}>
                {renderIcone()}

                <input 
                    type={inputType} 
                    className="w-full border-none outline-none text-[16px] text-[#6B7280]" 
                    placeholder={texto} 
                />
                {isPassword && (
                    <button 
                        type="button"
                        onClick={() => setIsClicked(!isClicked)}
                        className="cursor-pointer focus:outline-none"
                    >
                        <img
                            src={isClicked ? "src/assets/icons/showPassTrue.svg" : "src/assets/icons/showPassFalse.svg"} 
                            alt="Toggle Password"
                            className="w-[24px] h-[24px]"
                        />
                    </button>
                )}
            </div>
        </div>
    );
}