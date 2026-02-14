import { Button } from "./Button";
import { SvgIconProduct } from "./SvgIconProduct";
type badgeType = 'Best Seller' | 'New' | 'Sale' | 'Premium' | 'Limited Time' 
        | 'Flash Sale' | 'Luxury Sale' | 'Summer Sale' | 'Sport Sale' | 'Out Of Stock'
interface ProductCardProps {
    title: string;
    ratingAvg: number;
    ratingQuantity: number;
    currentPrice: number;
    oldPrice?: number;
    category?: 'Tops'| 'Bottoms' | 'Dresses' | 'Shoes' | 'Acessories';
    productBadge?: badgeType[]
    

    cardStyle?: 'Home' | 'Sales'| 'Wishlist';
    imgSrc?: string;
    imgAlt?: string;
}

export function ProductCard({title="product", ratingAvg=0, ratingQuantity=0, currentPrice=0, oldPrice, productBadge=[], imgSrc="/src/assets/placeholder.svg", imgAlt, cardStyle, category}:ProductCardProps) {
    const isHome = cardStyle === 'Home'
    const isSales = cardStyle === 'Sales'
    const isWishlist = cardStyle === 'Wishlist'

    let saving = ''

    let allBadges:string[] = [...productBadge];
    const priceColor: string = isSales ? "text-red-text" : "text-primary"
    const buttonColor: "default" | "white" | "red" = !isHome ? "default" : "white"

    if(isSales){
        const discount = Math.round( (1 - (currentPrice/(oldPrice as number)))*100 ) 
        const numericDiscount = oldPrice as number - currentPrice;
        saving = (`Save $${numericDiscount.toString()}`)
        allBadges.unshift(`-${discount.toString()}%`)
    }
    if(allBadges.length == 0){
        allBadges = ["New"];
    }
    function getBadgeColor(text:string){
        if(text.includes('%')  || text == 'Sale'){
            return "bg-[#EF4343] text-secondary";
        }
        if(text == 'Out Of Stock'){
            return "bg-[#EF4343] text-secondary";
        }
        if(!isHome){
            return "bg-[#F3F4F6] text-black";
        }
        return"bg-primary text-secondary";
    }
    

    return (
        <>
            <article className="w-89.5 h-auto border-0 rounded-xl shadow-lg hover:shadow-xl relative
            lg:w-79.5 lg:h-112.5">

                {/**div das badges com loop */}
                <div className={`${isSales ? 'flex justify-between w-full' : 'flex-col'}  p-3 z-1 absolute gap-2`}>
                    {allBadges.map( (badgeText) =>{
                        return(
                            <div className={`relative flex items-center ${getBadgeColor(badgeText)} py-0.75 px-2.75 rounded-[100rem] h-5.5 `}>
                                <span className=" font-semibold text-[0.75rem]">{badgeText}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="h-89.5 rounded-t-xl overflow-hidden lg:h-79.5">
                    <img className="w-full h-full hover:scale-105 object-cover" src={imgSrc} alt={imgAlt}></img>
                </div>
                <div className=" bg-secondary rounded-b-xl flex flex-col gap-2 p-4">
                    
                    <div className={` ${!isHome ? 'flex justify-between' : 'hidden'}`}>
                        <span className="font-semibold text-[0.75rem] py-0.5 border-(--border-primary) border rounded-full px-2.75">{category}</span>
                        <div className="text-[0.875rem] flex items-center gap-1">
                            <img src="/src/assets/icons/starIcon.svg"></img>
                            <span className="font-semibold">{ratingAvg}</span>
                            <span className="font-normal text-tertiary ml-1">({ratingQuantity})</span>
                        </div>
                    </div>

                    <h3 className="text-primary text-[1.125rem] font-semibold">{title}</h3>
                    {/*to escondendo essa div que mostra o rating caso n seja a home. pelo que eu vi so a tela de home e order
                    tem essa mesma disposicao do rating abaixo do nome, entao acho q da pra deixar assim. o estilo da tela de order,
                    inclusive, me parece o mesmo da de home*/}
                    <div className={`text-[0.875rem] flex items-center gap-1 ${isHome ? '' : 'hidden'}`}>
                        <img src="/src/assets/icons/starIcon.svg"></img>
                        <span className="font-semibold">{ratingAvg}</span>
                        <span className="font-normal text-tertiary ml-1">({ratingQuantity})</span>
                    </div>
                    <div className= {`flex  ${!isHome ? 'flex-col gap-y-2' : 'justify-between '}`}>
                        <div className="flex gap-2 items-center">
                            <span className={`text-[1.25rem] font-bold ${priceColor}`}>${currentPrice}</span>
                            <span className={`text-[0.875rem] font-normal text-tertiary line-through ${oldPrice ? "inline-block" : "hidden"} `}>${oldPrice}</span>
                            <div className={`${!isSales ? 'hidden' : 'flex'} bg-[#EF4343]  items-center text-white py-0.75 px-2.75 rounded-[100rem] h-5.5 `}>
                                <span className=" font-semibold text-[0.75rem] ">{saving}</span>
                            </div>
                        </div>
                        <div className={`${!isHome ? 'w-full flex gap-2' : 'w-25'}`}> 
                            <Button texto="Add to Cart" color={buttonColor} link="" buttonClassName="h-[length:36px]"  iconSrc={!isHome ? "src/assets/icons/cartIconWhite.svg" : undefined} iconPos="left"/>
                            <SvgIconProduct path = "\src\assets\icons\heartIcon.svg" alt="Ícone para salvar na wishlist" border="true" className={`${isHome ? 'hidden' : ''}`}/>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}