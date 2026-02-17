import { useMemo, type ReactNode } from "react";
import { Button } from "../Button";
import { ContentBox } from "./ContentBox";
import { Situation } from "./Situation";

interface OrderProps {
    orderName?: string;
    totalPrice?: number;
    time?: string
    adress?: string;
    rastreio?: string;
    situations?: "DELIVERED" | "SHIPPED" | "PROCESSING";
    variantes: Variant[];
}

interface Product{
    name?: string;
    rating?: number;
    price?: number;
    numReviews?: number;
    isOutOfStock?: boolean;
}

interface Variant{
    produtos?: Product;
    id: number;
    color?: string;
    size?: string;
    photo?:ReactNode
}

interface QuantityVarinats extends Variant {
    quantidade : number
}

export function Order({
    orderName = "ORD-2024-001",
    totalPrice = 186,
    time = "14/01/2024",
    adress = "123 Main St, New York, NY 10001",
    rastreio = "TRK123456789",
    situations = "DELIVERED",
    variantes}:OrderProps
    ) {

    const VariantList = useMemo(() => {
        
        const concatenados = variantes.reduce<Record<number, QuantityVarinats>>((acc, actualVariant) => {
            
            const chave = actualVariant.id;

            if(!acc[chave]){
                acc[chave] = { ...actualVariant, quantidade: 1};
            } else {
                acc[chave].quantidade += 1; 
            }

            return acc;
        }, {});

        return Object.values(concatenados)

    }, [variantes]);



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
                    {VariantList.map((variantes) => (
                        <li key={variantes.id} className="flex justify-between items-center gap-[12px]" >
                            <img src={` ${variantes.photo ?? "src/assets/Images/productImages.png" } `} alt="Product" />

                            <div className="flex flex-col items-start w-full">
                                <h2 className="font-semibold text-[16px]/6"> {variantes.produtos?.name ?? "Premium Cotton T-shirt"}</h2>
                                <span className="text-[14px]/5 text-tertiary">Size: {variantes.size ? variantes.size : "M"} • Color: {variantes.color ?? "Black"} • Qty: {variantes.quantidade ?? "2"}</span>
                                <span className="text-[16px]/6 font-semibold">${variantes.produtos?.price ?? "29"}</span>
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