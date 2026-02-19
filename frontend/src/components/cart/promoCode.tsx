import { useState } from "react";
import { useCart } from "./cartContext"; // Importe o hook

export const PromoCode = () => {
    const [code, setCode] = useState("");
    const { applyCoupon } = useCart(); 

    // O botão estará desativado se o texto estiver vazio
    const isButtonDisabled = code.trim().length === 0;

    const handleApply = () => {
        const success = applyCoupon(code);
        if (success) {
            alert("Cupom aplicado com sucesso!");
        } else {
            alert("Cupom inválido.");
        }
    };

    return(
        <>

            <div className="flex flex-col gap-3 pr-4 pl-4 pb-4 m-5 mt-0 border-1 border-gray-300 rounded-xl md:w-full">

                <div className="flex flex-row gap-1  mt-2 items-center">
                    <img src="src/assets/icons/targetPromo.svg" alt="target" />
                    <span className="font-bold text-2xl">Promo Code</span>
                </div>

                <div className="flex flex-row gap-2 justify-between">
                    <div className="flex-4">
                        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter promo code" className="border-1 border-gray-300 rounded-xl p-2 pl-2 w-full"/>
                        </div>
                    
                    <div className="flex-1">
                        <button disabled={isButtonDisabled} className={`border-1 border-gray-300 rounded-xl p-2 pr-3 pl-3 bg-black ${isButtonDisabled && "opacity-60 grayscale"} text-white`} onClick={handleApply}>Apply</button>
                    </div>
                </div>

                <span className="text-gray-500 font-light text-xs">Try: SAVE10, WELCOME20, STUDENT15</span>
            </div>
    
        </>
    )
}