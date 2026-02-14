import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { ProductCard } from "../ProductCard"
import { SvgIconProduct } from "../SvgIconProduct";


export function ProductSection(){
    const quantityFound = 6;
    return(
        <>
            <main className="flex flex-col gap-6">
                {/**sec de sale items  */}
                <section className="flex flex-col gap-2 sm:items-center lg:flex-row lg:justify-between">
                    <div>
                        <h2 className="font-bold text-primary text-2xl">Sale Items</h2>
                        <p className="text-tertiary">{quantityFound} products found</p>
                    </div>

                    <div className="flex gap-3">
                        <select name="" id="" className="rounded-xl border border-(--border-primary)  text-[0.875rem] py-1 px-2 w-48" >
                            <option selected value="Opcao1" >Featured</option>
                            <option value="Opcao1">Opcao1</option>
                            <option value="Opcao1">Opcao1</option>
                        </select>
                        <div className="flex gap-1">
                            <SvgIconProduct path = "src\assets\icons\gridIcon.svg" border="false" color="bg-primary" alt="ícone para alternar para disposição em grade"/>
                            <SvgIconProduct path="src\assets\icons\listIcon.svg" border="true" alt="ícone para alternar para disposição em lista"/>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-6 items-center lg:grid lg:grid-cols-3 lg:">
                    <ProductCard title="Premium Cotton T-Shirt" ratingAvg={4.8} ratingQuantity={124} currentPrice={29} cardStyle="Sales" category="Tops" oldPrice={49} productBadge={["Limited Time"]}/>
                    <ProductCard title="Designer Jeans" ratingAvg={4.9} ratingQuantity={89} currentPrice={79} cardStyle="Sales" category="Bottoms" oldPrice={120} productBadge={["Best Seller"]}/>
                    <ProductCard title="Leather Ankle Boots" ratingAvg={4.7} ratingQuantity={203} currentPrice={99} oldPrice={180} cardStyle="Sales" category="Shoes" productBadge={["Flash Sale"]}/>
                    <ProductCard title="Cashmere Sweater" ratingAvg={4.8} ratingQuantity={156} currentPrice={120} oldPrice={200} cardStyle="Sales" category="Tops" productBadge={["Luxury Sale"]}/>
                    <ProductCard title="Summer Dress" ratingAvg={4.6} ratingQuantity={91} currentPrice={49} oldPrice={89} cardStyle="Sales" category="Dresses" productBadge={["Luxury Sale"] }/>
                    <ProductCard title="Athletic Sneakers" ratingAvg={4.5} ratingQuantity={234} currentPrice={84} oldPrice={140} cardStyle="Sales" category="Shoes" productBadge={["Sport Sale"]}/>
                </section>
                <div className="w-48 py-4 self-center ">
                    <Button texto="View All Products" link="" iconPos="right" color="white"/>
                </div>
            </main>
               
        </>
        
    )
}