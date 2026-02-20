// import { useState } from "react";
import { useCart } from "./cartContext";
import type { CartItemData } from "./cartContext";

// interface cartItemProps {
//     id: string;
//     name: string;
//     brand: string;
//     size: string;
//     color: string;
//     price: number;
//     image?: string;
//     promotion?: number; // Em %
//     inStock: boolean;
// }


export const CartItem = ({id, name, brand, size, color, price, image, promotion, inStock} : CartItemData & { id: string }) => {

    const hasImage = Boolean(image);
    const hasPromotion = Boolean(promotion);
    
    const valuePromotion = hasPromotion ? (price / 100) * promotion! : 0;


    const { items, updateQuantity, removeItem } = useCart();
    const currentItem = items.find(item => item.id === id);
    const quantity = currentItem?.quantity || 1;

    const handleAdd = () => {
    // Só aumenta se for menor que o máximo
        if (quantity < 10) updateQuantity(id, quantity + 1);  
    };

    const handleRemove = () => {
    // Só diminui se for maior que o mínimo (1)
        if (quantity > 1) updateQuantity(id, quantity - 1);
    };


    return(
        <>
            <div className="flex flex-col pr-4 pl-4">

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pl-5 pb-10 pr-5">
                {hasImage ? (<img src={image} alt="produto"/>) : (<p className="h-25 w-25 bg-gray-300 rounded-3xl"></p>)}
                <div className="md:flex md:flex-col flex-1">

                    <div className="flex flex-row items-center justify-between">
                        <span className="font-bold">{name}</span>
                        {hasPromotion ?
                        (<div className="flex flex-col">
                            <div className="flex flex-row pr-2 gap-1">
                                <span className="font-black">${price - valuePromotion}</span>
                                <span className="font-stretch-50%">${price}</span>
                            </div>
                            <span className="bg-red-400 rounded-xl flex items-center justify-center h-5 text-white text-xs md:text-sm  ">Save ${valuePromotion}</span>
                        </div>) : (<span className=" font-black pr-2">${price}</span>)}
                    
                    </div>
                    <span className="text-base font-light text-gray-500">{brand}</span>
                
                    <div className="flex flex-row gap-3">
                        <span className="text-sm font-light text-gray-600">Size: {size}</span>
                        <span className="text-sm font-light text-gray-600">Color: {color}</span>
                    </div>

                    
                    <div className="flex flex-col md:flex-row md:justify-between">

                        {inStock ? (<div className="flex flex-row border-1 border-gray-500 rounded-xl pr-2 pl-2 gap-3 items-center w-max justify-between mt-3">
                            <button className="bg-transparent text-black text-2xl" onClick={handleRemove}>-</button>
                            <span className="text-black text-base pr-3 pl-3">{quantity}</span>
                            <button className="bg-transparent text-black text-2xl"onClick={handleAdd}>+</button>
                            </div>
                            ) : (
                            <div className="flex flex-row border-1 border-gray-500 rounded-md pr-2 pl-2 gap-3 items-center w-max justify-between mt-3 hover:bg-gray-300">
                            <button className="text-black text-sm pr-3 pl-3 bg-transparent">Notify When Available</button>
                            </div>)
                        }
                    

                        <div className="flex flex-row gap-5 mt-2">
                            <button className="flex flex-row items-center bg-transparent hover:bg-gray-200 border-none rounded-2xl pl-2 pr-2">
                                <img src="src/assets/icons/wishlistButton.svg" alt="wishlist button" className="size-5"/>
                                <span className="font-medium">Save for Later</span>
                            </button>

                            <button className="flex flex-row items-center bg-transparent hover:bg-gray-200 border-none rounded-2xl pl-2 pr-2">
                                <img src="src/assets/icons/removeButton.svg" alt="wishlist button" className="size-5"/>
                                <span className="font-medium" onClick={() => removeItem(id)}>Remove</span>
                            </button>

                        </div>

                    </div>
                    


                </div>
                

            </div>

            <span className="h-0.5 w-full bg-gray-300"></span>

            </div>
            
        </>
    );
}