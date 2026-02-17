import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';

interface ContentBoxProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleClassName?: string;
  titleIconSrc?: string;
  titleIconAlt?: string;
  children?: ReactNode;
  buttonName?: string;
  buttonIconSrc?: string;
  buttonLink?: string;
  buttonIconAlt?: string;
  buttonColor?: "default" | "white" | "red"
  buttonIconPos?: "left" | "right"
  buttonClassName?: string;
}

export function ContentBox({ children,title,titleClassName,titleIconAlt,titleIconSrc,buttonName,buttonIconSrc,buttonClassName,buttonIconAlt,buttonColor,buttonIconPos,buttonLink, className, ...props }: ContentBoxProps) {

    const showButton = buttonName || buttonLink;

  return (
    <div
      className={`flex flex-col items-center pt-[25px] pr-[24px] pb-[24px] pl-[24px] gap-[24px] w-full border-solid border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] ${className || ''}`}
      {...props}
    >
        <div className="flex justify-between items-center w-full ">
          <div className='flex items-center justify-center gap-[6px] '>
            <img src={titleIconSrc} alt={titleIconAlt} className={` ${titleIconSrc ? "inline-block" : "hidden"}`}/>
            <h1 className={`font-semibold text-[24px] ${titleClassName || ''}`} >
                {title}
            </h1>    
          </div>
             
            {showButton && (
          <Button 
          buttonClassName={buttonClassName || '!w-[100px]'}
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



