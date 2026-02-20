import type { Product } from "../../hooks/useProduct";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { ProductCard } from "../ProductCard"
import { SvgIconProduct } from "../SvgIconProduct";


export function ProductSection(){
    const quantityFound = 6;
    const products: Product[] = [
  {"id": 1, "name": "Premium Cotton T-Shirt", "rating": 4.8, "price": 49, "SalePrice": 29, "numOfReviews": 124, "isOutOfStock": false, "variant": [], "categories": [{"id": 1, "type": "Tops"}], "collection": null, "description": ""},
  {"id": 2, "name": "Designer Jeans", "rating": 4.9, "price": 120, "SalePrice": 79, "numOfReviews": 89, "isOutOfStock": false, "variant": [], "categories": [{"id": 2, "type": "Bottoms"}], "collection": null, "description": ""},
  {"id": 3, "name": "Leather Ankle Boots", "rating": 4.7, "price": 180, "SalePrice": 99, "numOfReviews": 203, "isOutOfStock": false, "variant": [], "categories": [{"id": 3, "type": "Shoes"}], "collection": null, "description": ""},
  {"id": 4, "name": "Cashmere Sweater", "rating": 4.8, "price": 200, "SalePrice": 120, "numOfReviews": 156, "isOutOfStock": false, "variant": [], "categories": [{"id": 1, "type": "Tops"}], "collection": null, "description": ""},
  {"id": 5, "name": "Summer Dress", "rating": 4.6, "price": 89, "SalePrice": 49, "numOfReviews": 91, "isOutOfStock": false, "variant": [], "categories": [{"id": 4, "type": "Dresses"}], "collection": null, "description": ""},
  {"id": 6, "name": "Athletic Sneakers", "rating": 4.5, "price": 140, "SalePrice": 84, "numOfReviews": 234, "isOutOfStock": false, "variant": [], "categories": [{"id": 3, "type": "Shoes"}], "collection": null, "description": ""}
]
    const badges = ['Best Seller' , 'New' , 'Sale' , 'Premium' , 'Limited Time' 
        , 'Flash Sale' , 'Luxury Sale' , 'Summer Sale' , 'Sport Sale']
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
                            {badges.map((badgeText) =>{
                                return(
                                    <option>{badgeText}</option>
                                )
                            })}
                        </select>
                        <div className="flex gap-1">
                            <SvgIconProduct path = "src\assets\icons\gridIcon.svg" border="false" color="bg-primary" alt="ícone para alternar para disposição em grade"/>
                            <SvgIconProduct path="src\assets\icons\listIcon.svg" border="true" alt="ícone para alternar para disposição em lista"/>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-6 items-center lg:grid lg:grid-cols-3 lg:">
                    <ProductCard product={products[0]} cardStyle="Sales" productBadge={["Limited Time"]}/>
                    <ProductCard product={products[1]} cardStyle="Sales" productBadge={["Best Seller"]}/>
                    <ProductCard product={products[2]} cardStyle="Sales" productBadge={["Flash Sale"]}/>
                    <ProductCard product={products[3]} cardStyle="Sales" productBadge={["Luxury Sale"]}/>
                    <ProductCard product={products[4]} cardStyle="Sales" productBadge={["Luxury Sale"] }/>
                    <ProductCard product={products[5]} cardStyle="Sales" productBadge={["Sport Sale"]}/>
                </section>
                <div className="w-48 py-4 self-center ">
                    <Button texto="View All Products" link="" iconPos="right" color="white"/>
                </div>
            </main>
               
        </>
        
    )
}