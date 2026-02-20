import { CartContext, CartProvider } from "../../contexts/CartProvider";
import { UserContext } from "../../contexts/UserProvider";
import type { Variant } from "../../hooks/useProduct";
import { ProductInfoContext } from "../../pages/ProductInfo";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { useContext, useEffect } from "react";

interface PurchaseActionProps {
    variant: Variant | null
    quantity: number
}

export function PurchaseActionButtons({variant, quantity}:PurchaseActionProps) {

    const { addToCart } = useContext(CartContext)

    return <>
        <div className="flex flex-col gap-4">
            <div className="flex gap-3">
                <Button type="submit" link="" texto="Add to Cart" iconSrc="/src/assets/icons/whiteCartIcon.svg" iconPos="left" buttonClassName="!h-11" onClick={() => {variant !== null ? addToCart(variant.id, quantity) : ""}}/>
                <IconButton iconSrc="/src/assets/icons/shareIcon.svg" buttonClassName="!h-11 border border-(--border-primary) w-20.5 flex !justify-center"/>
            </div>
            <Button type="submit" link="" color="white" texto="Buy Now" iconSrc="/src/assets/icons/whiteCartIcon.svg" iconPos="left" buttonClassName="!h-11"/>
        </div>
    
    </>
}