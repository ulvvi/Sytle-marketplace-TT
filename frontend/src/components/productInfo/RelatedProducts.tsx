import { ProductCard } from "../ProductCard";

export function RelatedProducts() {
    return ( 
        <>
            <aside className="my-8">
                <h2 className="mb-8 text-[1.5rem] font-bold">You Might Also Like</h2>
                <div className="flex flex-col items-center gap-6">
                    <ProductCard cardStyle="ProductInfo"/>
                    <ProductCard cardStyle="ProductInfo"/>
                    <ProductCard cardStyle="ProductInfo"/>
                </div>
                
            </aside>
        </>
    )
}