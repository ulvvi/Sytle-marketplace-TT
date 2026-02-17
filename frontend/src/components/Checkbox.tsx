import type { ReactNode } from 'react';
interface CheckboxProps{
    label: ReactNode
}

export function CheckBox({label}: CheckboxProps){
    return(
        <label className="flex items-center">
            <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none h-[16px] w-[16px] border-2 border-primary rounded-full checked:bg-primary transition-all cursor-pointer" />
                
                <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                    xmlns="http://www.w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <span className="ml-[8px] text-[14px] text-primary font-semibold">{label}</span>
        </label>
    )
}