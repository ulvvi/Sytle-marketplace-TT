import { Button } from "../Button";
import { ProductCard } from "../ProductCard";

export function FeatureProducts() {
    return (
        <>  
            <section className="bg-[#F3F4F633] mb-20 mt-20 px-4">
                <h2 className="text-primary text-center text-[2.25rem] font-bold mb-4">Featured Products</h2>
                <p className="text-tertiary text-center text-[1.25rem] mb-16">Handpicked favorites from our latest collection</p>
                <div className="flex flex-col gap-8 items-center justify-center  w-full mb-12 lg:flex-row">
                    <ProductCard title="Vintage Denim Jacket" ratingAvg={4.8} ratingQuantity={124} currentPrice={89} oldPrice={120} productBadge="Best Seller"/>
                    <ProductCard title="Oversized Blazer" ratingAvg={4.9} ratingQuantity={89} currentPrice={145} productBadge="New"/>
                    <ProductCard title="Comfort Slim Jeans" ratingAvg={4.7} ratingQuantity={203} currentPrice={79} oldPrice={99} productBadge="Sale"/>
                    <ProductCard title="Silk Blouse" ratingAvg={4.8} ratingQuantity={156} currentPrice={125} productBadge="Premium"/>
                </div>
                <div className="px-18.5 flex justify-center">
                    <Button texto="View All Products" color="white" link="" buttonClassName="min-w-[180px] lg:w-52.5" iconSrc="/src/assets/icons/blackArrowIcon.svg"/>
                </div>
            </section>
        </>
    )
}