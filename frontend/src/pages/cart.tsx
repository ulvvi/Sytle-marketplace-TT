import { Header } from "../components/Header";
import ReturnButton from "../components/cart/ReturnButton";
import { CartSection } from "../components/cart/cartSection";
import { CartProvider } from "../components/cart/cartContext";
import { PromoCode } from "../components/cart/promoCode";
import { OrderSummary } from "../components/cart/orderSummary";

export function Cart() {

    return(
        <>
            <CartProvider>
                <Header/>
                <ReturnButton text="Shopping Cart" link="a" isCart={true} />
                <div className="md:flex md:flex-row md:pr-20">
                    <div className="md:flex-2">
                        <CartSection/>

                    </div>
                    
                    <div className="md:flex-1 md:flex-col">
                        <PromoCode/>
                        <OrderSummary/>
                    </div>
                    
                </div>
            </CartProvider>
        </>
    );
}

