import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserProvider";

interface Cart {
    id: number;
    subtotal: number;
    shipping: number,
    tax: number,
    promoCode: string,
    totalCost: number,
    cartVariants: any[],
    cartQuantity: number
}

interface CartContextType {
    cart: Cart | null,
    addToCart: (variantId: number, quantity: number) => Promise<void>
    removeFromCart: (variantId: number) => Promise<void>
}

export const CartContext = createContext({} as CartContextType);

export function CartProvider({children}:{children: ReactNode}) {
    const [cartData, setCartData] = useState<Cart | null>(null);
    const { user, isLogged } = useContext(UserContext);

    const cartQuantity = cartData?.cartVariants?.reduce((acc:number, item:any) => acc + item.quantity, 0) ?? 0
    const cart: Cart | null = cartData ? {
        ...cartData, cartQuantity: cartQuantity
    } : null;

    useEffect(() => {
        if(isLogged && user?.id){
            const requestData = async () => {
                const response = await fetch(`http://localhost:3333/cart/${user.id}`, {
                    method: "GET",
                    headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("styleToken")}`
                    }
                })

                const data = await response.json();
                if(response.ok){
                    setCartData(data);
                }   
            }
            requestData();
        } else {
            setCartData(null);
        }
    }, [user, isLogged]);

    async function addToCart(variantId: number, quantity: number){
        if(isLogged && user?.id){
            const response = await fetch(`http://localhost:3333/cart/${user.id}`, {
                        method: "POST",
                        headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("styleToken")}`
                        },
                        body: JSON.stringify({variantId: variantId})
            })

            const data = await response.json();
            if(response.ok){
                setCartData(data)
            }
        } 
    }

    async function removeFromCart(variantId: number){
        if(isLogged && user?.id){
            const response = await fetch(`http://localhost:3333/cart/${user.id}`, {
                        method: "DELETE",
                        headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("styleToken")}`
                        },
                        body: JSON.stringify({variantId: variantId})
            })

            const data = await response.json();
            if(response.ok){
                setCartData(data)
            }

        } 
    }


    return (
        <>
            <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
                {children}
            </CartContext.Provider>
        </>
    )
}