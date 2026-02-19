import { useCart } from "./cartContext";
import { Button } from "../Button";

export const OrderSummary = () => {
    const { subtotal, couponDiscountValue, total, totalAvailableItems } = useCart();

    return(
        <div className="flex flex-col gap-3 pr-4 pl-4 pb-4 pt-5 m-5 mt-0 border-1 border-gray-300 rounded-xl md:w-full">
            <span className="font-bold text-2xl">Order Summary</span>

            <div className="flex flex-row justify-between items-center">
                <span>Subtotal ({totalAvailableItems} {totalAvailableItems == 1 ? "item" : "items"})</span>
                <span> ${subtotal}</span>
            </div>

            <div className="flex flex-row justify-between">
                <span className="text-green-600">Savings</span>
                <span className="text-green-600"> ${couponDiscountValue}</span>
            </div>

            <div className="flex flex-row justify-between">
                <span >Shipping</span>
                <span > $0.00</span>
            </div>

            <span className="border-1 w-full border-gray-300"></span>

            <div className="flex flex-row justify-between">
                <span className="font-black text-lg">Total</span>
                <span className="font-black text-lg">${total}</span>
            </div>

            <div className="flex flex-col mt-2 gap-2 pr-5 pl-5 items-center">
                <Button texto="Proceed to Checkout" link="Checkout"/>
                <Button texto="Continue Shopping" link="Home"/>
                <span className="text-gray-500 font-light text-xs">Secure checkout with SSL encryption</span>
                <span className="text-gray-500 font-light text-xs">30-day return policy • Free returns</span>
            </div>


        </div>

    );
}