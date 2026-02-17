import { Button } from "../Button";
import { IconButton } from "../IconButton";

export function PurchaseActionButtons() {
    return <>
    
        <div className="flex flex-col my-6 gap-4">
            <div className="flex gap-3">
                <Button type="submit" link="" texto="Add to Cart" iconSrc="/src/assets/icons/whiteCartIcon.svg" iconPos="left" buttonClassName="!h-11"/>
                <IconButton iconSrc="/src/assets/icons/shareIcon.svg" buttonClassName="!h-11 border border-(--border-primary) w-20.5 flex !justify-center"/>
            </div>
            <Button type="submit" link="" color="white" texto="Buy Now" iconSrc="/src/assets/icons/whiteCartIcon.svg" iconPos="left" buttonClassName="!h-11"/>
        </div>
    
    </>
}