import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode;
  buttonName?: string;
  buttonIconSrc?: string;
  buttonLink?: string;
  buttonIconAlt?: string;
  buttonColor?: "default" | "white" | "red"
  buttonIconPos?: "left" | "right"
}

export function ContentBox({ children,title,buttonName,buttonIconSrc,buttonIconAlt,buttonColor,buttonIconPos,buttonLink, className, ...props }: CardProps) {

    const showButton = buttonName || buttonIconSrc || buttonLink || buttonIconAlt || buttonIconPos || buttonColor;

  return (
    <div
      className={`flex flex-col items-center  pt-[25px] pr-[24px] pb-[24px] pl-[24px] gap-[24px] w-full border-solid border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] ${className || ''}`}
      {...props}
    >
        <div className="flex justify-between items-center w-full ">
            <h1 className='font-semibold text-[24px]'>
                {title}
            </h1>    
            {showButton && (
          <Button className='w-[100px] h-[36px] flex items-center justify-center  cursor-pointer border-[1px] border-(--border-primary) rounded-[10px] border-solid gap-2'
            texto={buttonName || ''} 
            link={buttonLink || ''}
            iconSrc={buttonIconSrc || ''}
            iconAlt={buttonIconAlt || ''}
            iconPos={buttonIconPos}
            color={buttonColor}
            
          />
        )}
        </div>
        
      {children}
    </div>
  );
}



