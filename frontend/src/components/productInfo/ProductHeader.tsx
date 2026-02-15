interface ProductCardProps {
    title: string;
    collection: string;
    ratingAvg: number;
    ratingQuantity: number;
    currentPrice: number;
    oldPrice?: number;
    productBadges: productBadge[]
}

export type productBadge = "Tops" | "Limited Time";

export function ProductHeader({title, collection, ratingAvg = 0.0, ratingQuantity = 0, currentPrice, oldPrice, productBadges}:ProductCardProps) {
    const discount = oldPrice === undefined ? 0 : oldPrice - currentPrice;
    return (
        <>
            <div className="flex flex-col gap-6 mb-6"> 
                <div>
                    <div className="flex gap-2"> 
                        {productBadges.map((badge, _) => (
                            <div className={`flex items-center py-0.75 px-2.75 rounded-[100rem] h-5.5 top-3 left-3 z-1 
                            ${{
                                "Tops": "bg-secondary border border-(--border-primary)",
                                "Limited Time": "bg-[#F3F4F6]",
                            }[badge]}`}>
                                <span className="text-primary font-semibold text-[0.75rem]">{badge}</span>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-[1.875rem] font-bold text-primary">{title}</h1>
                    <h2 className="text-[1rem] text-tertiary">{collection}</h2>
                </div>
                <div className="flex flex-row text-[1rem]">
                    <div className="flex flex-row flex-wrap">
                        {Array.from({length: 5}).map((_, i) => (
                            <img src={`${i <= ratingAvg - 1 ? "/src/assets/icons/starIcon.svg" : "/src/assets/icons/starOutlineIcon.svg"}`} className="w-5"/>
                        ))}
                    </div>
                    <span className="font-semibold text-primary ml-2">{ratingAvg}</span>
                    <span className="font-regular text-tertiary ml-4">({ratingQuantity} reviews)</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[1.875rem] font-bold text-[#DC2626]">${currentPrice}</span>
                    <span className={`text-[1.25rem] text-tertiary line-through ${oldPrice ? "inline-block" : "hidden"}`}>${oldPrice}</span>
                    <div className={`flex items-center bg-[#EF4343] px-2.75 rounded-[100rem] h-6 z-1 ${oldPrice ? "inline-block" : "hidden"}`}>
                        <span className={`text-secondary font-semibold text-[0.75rem]`}>Save ${discount}</span>
                    </div>
                </div>
            </div>
        </>
    )
}