import { Button } from "../Button";
import { ContentBox } from "./ContentBox";

interface OrderProps {
    orderName?: string;
    totalPrice?: number;
    
}


export function Order({
    orderName = "ORD-000-000",
    totalPrice = 186}:OrderProps) {

    

    return(
        <>
        <ContentBox className="!gap-0">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center">
                    <div className="flex items-center">
                        <h2 className="text-[16px]/6 font-semibold">Order {orderName}</h2>

                    </div>
                    
                    <div>
                        <span>Placed</span>
                    </div>

                </div>
                <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center justify-end">
                        <span className="text-[20px]/5 font-bold">${totalPrice} </span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <Button texto="View Deatails" link="" iconSrc="src/assets/icons/showPassTrue.svg" color="white" iconPos="left" buttonClassName="!w-[136px]"/>
                        <Button texto="Reorder" link="" buttonClassName="!w-[136px] hidden lg:inline-block" color="white" iconSrc="src/assets/icons/PackageSmallIcon.svg" iconPos="left" />
                    </div>
                </div>
                
            </div>





        </ContentBox>
        
        </>
    )


}