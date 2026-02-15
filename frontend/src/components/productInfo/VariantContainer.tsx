import { useMemo, useState } from "react";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

interface Variant {
    id: number;
    color: string;
    size: string;
    stock: number;
    productId: number;
}

interface VariantContainerProps {
    variants: Variant[];
}

const colorMap: Record<string, string> = {
    "black": "#000000",
    "white": "#FFFFFF",
    "blue": "#1E40AF",
    "red": "#EF4444"
}

const sizes: string[] = ["XS", "S", "M", "L", "XL"]

export function VariantContainer({variants}:VariantContainerProps) {
    const [currentColor, setCurrentColor] = useState<string | null>(null)
    const [currentSize, setCurrentSize] = useState<string | null>(null)
    const [currentQuantity, setCurrentQuantity] = useState(1)
    
    const currentVariant = useMemo(() => {
        if (!(currentSize && currentColor)) return null;
        return variants.find((variant) => variant.color === currentColor && variant.size === currentSize) || null;
    },[variants, currentColor, currentSize])

    const productColors = useMemo(() => {
        return Array.from(new Set(variants.map((variant) => variant.color)))
    },[variants])

    const isSizeOnStock = ((size: string | null, color: string | null = currentColor) => {
        if (!color) return false;
        return variants.some((variant) => variant.color == color && variant.size === size && variant.stock > 0)
    })

    const isColorOnStock = ((color: string) => {
        return variants.some((variant) => variant.color === color && variant.stock > 0)
    })

    const handleChangeColor = ((color: string) => {
        setCurrentColor(color);
        setCurrentQuantity(1);
        if (!(isSizeOnStock(currentSize, color))) {
            setCurrentSize(null);
        }
        
    })

    const handleChangeSize = ((size: string) => {
        setCurrentSize(size);
        setCurrentQuantity(1);
    })

    const increaseQuantity = () => {
        if (currentVariant && currentQuantity < currentVariant.stock) setCurrentQuantity(currentQuantity + 1)
    }

        const decreaseQuantity = () => {
        if (currentQuantity > 1) setCurrentQuantity(currentQuantity - 1)
    }

    return (
        <>
            <div className="flex flex-col gap-6 my-6">
                
                <div className={`flex gap-2 items-center ${currentVariant ? "visible" : "invisible"}`}>
                    <div className={`w-3 h-3 bg-[#22C55E] rounded-full`}></div>
                    <span className={`font-semibold text-[#16A34A]`}>In Stock ({currentVariant?.stock} left)</span>
                </div>
                
                <hr className=" border-(--border-primary)"/>

                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Color:</legend>
                    <div className="flex gap-3">
                        {productColors.map((color) =>(
                            <div className="relative w-10 h-10">
                                <button style={{backgroundColor: colorMap[color]}} className={`w-10 h-10 rounded-full border-2 border-[#D1D5DB] disabled:opacity-50 disabled:grayscale-65 disabled:brightness-80 disabled:cursor-not-allowed ${color === currentColor ? "border-2 border-tertiary cursor-default" : "cursor-pointer hover:opacity-90"}`} onClick={() => handleChangeColor(color)} disabled={!isColorOnStock(color)}></button>
                                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 rotate-45 w-6 h-0.5 bg-[#EF4444]  opacity-100 brightness-200 cursor-not-allowed ${isColorOnStock(color) ? "hidden" : "inline-block"}`}></div>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Size:</legend>
                    <div className="flex gap-2 mb-3">
                        {sizes.map((size) => (
                            <Button color="white" texto={size} buttonClassName={`!h-12.5 disabled:cursor-default disabled:opacity-50 disabled:bg-[#F3F4F6] disabled:cursor-not-allowed ${size === currentSize ? "border-tertiary !cursor-default hover:bg-secondary" : ""}`} onClick={() => handleChangeSize(size)} textClassName="!font-normal !text-[1rem]" disabled={!isSizeOnStock(size)}/>
                        ))}
                    </div>
                    <span className="text-[0.875rem] font-semibold">Size Guide</span>
                </fieldset>
                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Quantity</legend>
                    <div className="flex gap-3 items-center">
                        <div className={`flex justify-evenly items-center w-35.5 h-10.5 border border-(--border-primary) rounded-[10px] overflow-hidden ${currentVariant === null ? "bg-[#F3F4F6]" : ""}`}>
                            <IconButton iconSrc="/src/assets/icons/minusIcon.svg" buttonClassName="hover:bg-[#F3F4F6] !w-full !h-full flex justify-center disabled:opacity-30 disabled:cursor-not-allowed" onClick={() => decreaseQuantity()} disabled={(currentVariant === null || currentQuantity <= 1)}/>
                            <span className={`w-full h-full flex items-center cursor-default justify-center ${currentVariant === null ? "opacity-50 cursor-not-allowed" : ""}`}>{currentQuantity}</span>
                            <IconButton iconSrc="/src/assets/icons/plusIcon.svg" buttonClassName="hover:bg-[#F3F4F6] !w-full !h-full flex justify-center disabled:opacity-30 disabled:cursor-not-allowed" onClick={() => increaseQuantity()} disabled={(currentVariant === null || currentQuantity >= currentVariant.stock)}/>
                        </div>
                        <span className={`text-[0.875rem] text-tertiary ${currentVariant ? "block" : "hidden"}`}>Max {currentVariant?.stock} items</span>
                    </div>
                </fieldset>
            </div>
        </>
    )
}