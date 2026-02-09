interface CategoryCardProps {
    title: string;
    quantity: number;
    imgSrc?: string;
    imgAlt?: string;

}

export function CategoryCard({title = "category", quantity = 0, imgSrc = "/src/assets/placeholder.svg", imgAlt}:CategoryCardProps) {
    return (
        <>
            <article className="w-89.5 h-89.5 relative bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
                <img className="w-full h-full hover:scale-105" src={imgSrc} alt={imgAlt}></img>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60 shadow-lg pointer-events-none"></div>
                <div className="absolute bottom-[15.59px] left-[16.42px]">
                    <h3 className="text-secondary text-[1.125rem] font-semibold">{title}</h3>
                    <p className="text-secondary text-[0.875rem]">{quantity}+ items</p>
                </div>
                
            </article>
        </>

    )
}