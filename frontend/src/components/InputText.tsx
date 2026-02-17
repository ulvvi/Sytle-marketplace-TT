import type { ReactNode, ChangeEvent } from "react";
import { useState } from "react";
export interface SelectOption {
    label: string;
    value: string | number;
}

interface InputTextProps {
    icone?: ReactNode;
    texto?: string;
    isPassword?: boolean;
    label?: string;
    inputClassName?: string;
    textClassName?: string;
    type?: string;
    options?: SelectOption[];
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    name?: string;
}

export function InputText({
    icone,
    texto = "Enter your text",
    isPassword = false,
    label,
    inputClassName,
    textClassName,
    type = "text",
    options,
    value,
    onChange,
    name
}: InputTextProps) {

    const [isClicked, setIsClicked] = useState(false);

    const inputType = () => {
        if (isPassword) {
            return !isClicked ? "password" : "text";
        }
        return type;
    };

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

            <div className={`flex items-center justify-evenly border-(--border-primary) rounded-[10px] border-[1px] border-solid w-full h-[40px] gap-[13px] px-[12px] bg-white ${inputClassName}`}>
                {renderIcone()}

                
                {options && options.length > 0 ? (
                    <select
                        className={`w-full border-none outline-none text-[16px] text-[#6B7280] bg-transparent cursor-pointer ${textClassName}`}
                        value={value}
                        onChange={onChange}
                        name={name}
                    >
                        <option value="" disabled selected hidden>{texto}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <>
                        <input
                            type={inputType()}
                            className={`w-full border-none outline-none text-[16px] text-[#6B7280] bg-transparent ${textClassName}`}
                            placeholder={texto}
                            value={value}
                            onChange={onChange}
                            name={name}
                        />
                        
                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => setIsClicked(!isClicked)}
                                className="cursor-pointer focus:outline-none flex items-center justify-center"
                            >
                                <img
                                    src={isClicked ? "src/assets/icons/showPassTrue.svg" : "src/assets/icons/showPassFalse.svg"}
                                    alt="Toggle Password"
                                    className="w-[24px] h-[24px]"
                                />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}