import { Button } from "./Button";

interface ProductCardProps {
    title: string;
    ratingAvg: number;
    ratingQuantity: number;
    currentPrice: number;
    oldPrice?: number;
    productBadge?: 'Best Seller' | 'New' | 'Sale' | 'Premium';
    imgSrc?: string;
    imgAlt?: string;
}

export function ProductCard({title="product", ratingAvg=0, ratingQuantity=0, currentPrice=0, oldPrice, productBadge="New", imgSrc="/src/assets/placeholder.svg", imgAlt}:ProductCardProps) {
    const badgeColor: string = productBadge==="Sale" ? "bg-[#EF4343]" : "bg-primary";
    return (
        <>
            <article className="w-89.5 h-122.5 border-0 rounded-xl shadow-lg hover:shadow-xl relative
            lg:w-79.5 lg:h-112.5">
                <div className={`flex items-center absolute ${badgeColor} py-0.75 px-2.75 rounded-[100rem] h-5.5 top-3 left-3 z-1`}>
                    <span className="text-secondary font-semibold text-[0.75rem]">{productBadge}</span>
                </div>
                <div className="h-89.5 rounded-t-xl overflow-hidden lg:h-79.5">
                    <img className="w-full h-full hover:scale-105 object-cover" src={imgSrc} alt={imgAlt}></img>
                </div>
                <div className="h-33 bg-secondary rounded-b-xl flex flex-col gap-2 p-4">
                    <h3 className="text-primary text-[1.125rem] font-semibold">{title}</h3>
                    <div className="text-[0.875rem] flex items-center gap-1">
                        <img src="/src/assets/icons/starIcon.svg"></img>
                        <span className="font-semibold">{ratingAvg}</span>
                        <span className="font-normal text-tertiary ml-1">({ratingQuantity})</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <span className="text-[1.25rem] font-bold">${currentPrice}</span>
                            <span className={`text-[0.875rem] font-normal text-tertiary line-through ${oldPrice ? "inline-block" : "hidden"} `}>${oldPrice}</span>
                        </div>
                        <div className="w-25">
                            <Button texto="Add to Cart" color="white" link="" buttonClassName="h-[length:36px]"/>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}