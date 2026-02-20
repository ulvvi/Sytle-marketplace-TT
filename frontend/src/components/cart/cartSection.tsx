import { CartItem } from "./cartItem";
import { useCart } from "./cartContext";


export function CartSection() {
    const { items, totalAvailableItems, totalOutOfStockItems } = useCart();

    const availableItems = items.filter(item => item.inStock);
    const outOfStockItems = items.filter(item => !item.inStock);
  return(
    <>

        <div className="flex flex-col md:pl-30">

            <div className="flex flex-col border-1 border-gray-300 rounded-xl m-5 mt-0 max-w-210">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 ml-5 mt-2 items-center">
                        <p className="border-1 border-b-green-500 rounded-full p-1 text-green-500 bg-green-500  text-xs h-3 w-3 flex items-center justify-center">x</p>
                        <p className="text-black font-black text-xl">Available Items ({totalAvailableItems})</p>
                    </div>
                    
                    {/* Onde entra os itens
                    <CartItem id="1" name="Premium Cotton T-Shirt" brand="STYLE Premium" size="M" color="Red" price={20} />
                    <CartItem id="2" name="Designer Jeans" brand="STYLE Premium" size="32" color="Black" price={100} promotion={30}/> */}
                    {availableItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col border-1 border-red-600 rounded-xl m-5 mt-0 max-w-210">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 ml-0 mt-2 items-center">
                        <p className="border-1 border-b-red-700 rounded-full p-1 text-red-700 bg-secondary ml-5 mt-1 text-xs h-5 w-5 flex items-center justify-center">!</p>
                    <p className="text-red-700 font-black text-xl">Out of Stock({totalOutOfStockItems})</p>
                    </div>
                    
                    {/* Onde entra os itens */}
                    <div className="opacity-60 grayscale">
                        {/* Percorremos a lista de fora de estoque */}
                        {outOfStockItems.map(item => (
                            <CartItem key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    </>
  );

}