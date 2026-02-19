import { useMemo, type ReactNode } from "react";
import { Button } from "../Button";
import { ContentBox } from "./ContentBox";
import { Situation } from "./Situation";
import type { orderVariantInfo } from "../../contexts/userContext";

interface OrderProps {
    orderName?: string;
    totalPrice?: number;
    time?: string
    adress?: string;
    rastreio?: string;
    situations?: "DELIVERED" | "SHIPPED" | "PROCESSING";
    variantes: orderVariantInfo[];
}

export function Order({
    orderName = "Unknown",
    totalPrice = 0,
    time = "Unknown",
    adress = "Unknown",
    rastreio = "Unknown",
    situations = "DELIVERED",
    variantes}:OrderProps
    ) {
    console.log(`VARIANTES : ${variantes}`)
    return(
        <>
        <ContentBox className="!gap-0 !pr-[15px]">
            <div className="flex flex-col w-full gap-[16px]">
                <div className="flex justify-between w-full gap-[40px]">
                <div className="flex flex-col items-center gap-[8px]">
                    <div className="flex flex-row items-center flex-wrap gap-[12px]">
                        <h2 className="text-[16px]/6 font-semibold">Order {orderName}</h2>
                        <Situation situation={situations ?? "DELIVERED"}/>
                    </div>

                    
                    <div className="flex flex-col items-start w-full gap-[4px]">
                        <span className="text-[14px]/5 text-tertiary">Placed on {time}</span>
                        <span className="text-[14px]/5 text-tertiary">{adress}</span>
                        <span className={`${situations === "PROCESSING" ? "hidden" : "inline-block"} text-[14px]/5 text-tertiary`}>Tracking: {rastreio}</span>
                    </div>

                    

                </div>
                <div className="flex flex-col gap-[8px] ">
                    <div className="flex items-center justify-end">
                        <span className="text-[20px]/5 font-bold">${totalPrice} </span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <Button texto="View Deatails" link="" iconSrc="src/assets/icons/showPassTrue.svg" color="white" iconPos="left" buttonClassName="!w-[132px] !h-[36px]"/>
                        <Button texto="Reorder" link="" buttonClassName={` ${situations === "DELIVERED" ? "!w-[105px] !h-[36px] hidden lg:flex":  "hidden"} `} color="white" iconSrc="src/assets/icons/PackageSmallIcon.svg" iconPos="left" />
                    </div>
                </div>
                
                </div>


                    <div className="w-full h-[1px] bg-[#E5E7EB]"></div>
                
                <ul className="w-full flex flex-col gap-[12px]">

                    {variantes?.map((varOrder) => (
                        <li className="flex justify-between items-center gap-[12px]" >
                            <img src={`src/assets/Images/productImages.png`} alt="Product" />

                            <div className="flex flex-col items-start w-full">
                                <h2 className="font-semibold text-[16px]/6"> {varOrder.variant.product.name}</h2>
                                <span className="text-[14px]/5 text-tertiary">Size: {varOrder.variant.size} • Color: {varOrder.variant.color} • Qty: {varOrder.quantity}</span>
                                <span className="text-[16px]/6 font-semibold">${varOrder.variant.product.price}</span>
                            </div>

                            <div className="flex flex-col gap-[8px]">
                                <Button texto="View Product" link="/Order" color="white" buttonClassName={` ${situations === "DELIVERED" ? "!w-[110px] !h-[36px]" : "hidden"} `}/>
                                <Button texto="Review" link="/Order" iconSrc="src/assets/icons/emptyStarIcon.svg" iconPos="left" color="white" 
                                buttonClassName={` ${situations === "DELIVERED" ? "!w-[110px] !h-[36px]" : "hidden"} `}/>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            

        </ContentBox>
        
        </>
    )


}