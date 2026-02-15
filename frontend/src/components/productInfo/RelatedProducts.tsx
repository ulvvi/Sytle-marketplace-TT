import { ProductCard } from "../ProductCard";

export function RelatedProducts() {
    return ( 
        <>
            <aside className="col-span-full my-8">
                <h2 className="mb-8 text-[1.5rem] font-bold">You Might Also Like</h2>
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
                    <ProductCard title="Cotton Polo Shirt" ratingAvg={4.7} currentPrice={39} oldPrice={55} cardStyle="ProductInfo"/>
                    <ProductCard title="Casual Henley" ratingAvg={4.6} currentPrice={35} cardStyle="ProductInfo"/>
                    <ProductCard title="Premium Hoodie" ratingAvg={4.8} currentPrice={79} oldPrice={99} cardStyle="ProductInfo"/>
                </div>
                
            </aside>
        </>
    )
}