import { useProduct, type Product } from "../hooks/useProduct";
import { Button } from "./Button";
import { SvgIconProduct } from "./SvgIconProduct";
import { useContext, useState } from 'react';

type badgeType = 'Best Seller' | 'New' | 'Sale' | 'Premium' | 'Limited Time' 
        | 'Flash Sale' | 'Luxury Sale' | 'Summer Sale' | 'Sport Sale' | 'Out Of Stock'
interface ProductCardProps {
    product: Product;
    productBadge?: badgeType[]
    cardStyle?: 'Home' | 'Sales'| 'Wishlist' |  'ProductInfo';
    imgSrc?: string;
    imgAlt?: string;
}



export function ProductCard({productBadge=[], imgSrc="/src/assets/placeholder.svg", imgAlt, cardStyle, product}:ProductCardProps) {
    const isHome = cardStyle === 'Home'
    const isSales = cardStyle === 'Sales'
    const isWishlist = cardStyle === 'Wishlist'
    const isProductInfo = cardStyle === 'ProductInfo'
    const formatedProductName = product?.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    let saving = ''

    let allBadges:string[] = [...productBadge];
    const priceColor: string = isSales ? "text-red-text" : "text-primary"
    const buttonColor: "default" | "white" | "red" = !(isHome || isProductInfo) ? "default" : "white"

    const [isLiked, setIsLiked] = useState(false)
    const likeProduct = () =>{
        setIsLiked(!isLiked)
    }

    if(isSales){
        const discount = product?.SalePrice ? Math.round( (1 - (product?.SalePrice/(product?.price as number)))*100 ) : 0;
        const numericDiscount = product?.SalePrice ? product?.price as number - product?.SalePrice : 0;
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
            <article className={` border-0 rounded-xl shadow-lg hover:shadow-xl relative${isSales ? 'w-full max-w-[320px] h-auto' :
                   isProductInfo ? "w-85.75 h-117.75 lg:w-110 lg:h-142" : 
                   'w-89.5 h-122.5 lg:w-79.5 lg:h-112.5'}
                group relative`}>
                    
                <div className="z-20 absolute left-68 top-3 invisible group-hover:visible">
                    <SvgIconProduct color="bg-[#F3F4F6]" border="false" onClick={likeProduct} path={`${isLiked ?'src/assets/icons/heartFilled.svg' : 'src/assets/icons/heartIcon.svg' }`} alt="Ícone para salvar na wishlist" className={`${(isHome || isProductInfo) ? 'hidden' : ''} `}/>
                </div>

                {/**div das badges com loop */}
                <div className={`${isSales ? 'flex justify-between w-full' : 'flex-col'}  p-3 z-1 absolute gap-2`}>
                    {allBadges.map( (badgeText) =>{
                        return(
                            <div className={`relative flex items-center ${getBadgeColor(badgeText)} py-0.75 px-2.75 rounded-[100rem] h-5.5 ${isProductInfo ? "hidden" : "block"}`}>
                                <span className=" font-semibold text-[0.75rem]">{badgeText}</span>
                            </div>
                        )
                    })}
                </div>

                <div className={` rounded-t-xl overflow-hidden 
                    ${isProductInfo ? "h-85.75 lg:h-110" : "h-89.5 lg:h-79.5"}`}>
                    <img className="w-full h-full hover:scale-105 object-cover" src={imgSrc} alt={imgAlt}></img>
                </div>
                <div className={`bg-secondary rounded-b-xl flex flex-col gap-2 p-4
                    ${isProductInfo ? "h-32" : isHome ? "h-33" : "h-auto"}`}>
                    
                    <div className={` ${!(isHome || isProductInfo) ? 'flex justify-between' : 'hidden'}`}>
                        <span className="font-semibold text-[0.75rem] py-0.5 border-(--border-primary) border rounded-full px-2.75">{product?.categories ? product?.categories[0]?.type : ""}</span>
                        <div className="text-[0.875rem] flex items-center gap-1">
                            <img src="/src/assets/icons/starIcon.svg"></img>
                            <span className="font-semibold">{product?.rating.toFixed(1)}</span>
                            <span className="font-normal text-tertiary ml-1">({product?.numOfReviews})</span>
                        </div>
                    </div>

                    <h3 className={`text-primary font-semibold
                        ${isProductInfo ? "text-[1rem]" : "text-[1.125rem]"}`}>{formatedProductName}</h3>
                    {/*to escondendo essa div que mostra o rating caso n seja a home. pelo que eu vi so a tela de home e order
                    tem essa mesma disposicao do rating abaixo do nome, entao acho q da pra deixar assim. o estilo da tela de order,
                    inclusive, me parece o mesmo da de home*/}
                    <div className={`text-[0.875rem] flex items-center gap-1 ${(isHome || isProductInfo) ? '' : 'hidden'}`}>
                        <img src="/src/assets/icons/starIcon.svg"></img>
                        <span className={`${isProductInfo ? "font-normal" : "font-semibold"}`}>{product?.rating.toFixed(1)}</span>
                        <span className={`font-normal text-tertiary ml-1 
                        ${isProductInfo ? "hidden" : "block"}`}>({product?.numOfReviews})</span>
                    </div>
                    <div className= {`flex  ${!(isHome || isProductInfo) ? 'flex-col gap-y-2' : 'justify-between '}`}>
                        <div className="flex gap-2 items-center">
                            <span className={`text-[1.25rem] font-bold ${isProductInfo ? "text-[1rem]" : "text-[1.125rem]"} ${priceColor}`}>${product?.SalePrice ? product?.SalePrice : product?.price}</span>
                            <span className={`text-[0.875rem] font-normal text-tertiary line-through ${product?.SalePrice ? "inline-block" : "hidden"} `}>${product?.price}</span>
                            <div className={`${!isSales ? 'hidden' : 'flex'} bg-[#EF4343]  items-center text-white py-0.75 px-2.75 rounded-[100rem] h-5.5 `}>
                                <span className=" font-semibold text-[0.75rem] ">{saving}</span>
                            </div>
                        </div>
                        <div className={`${isProductInfo ? 'w-14' :
                            !isHome ? 'w-full flex gap-2' : 'w-25'}`}> 
                            <Button texto={`${isProductInfo ? "View" : "Add to Cart"}`} color={buttonColor} link={`/Product/${product.id}`} buttonClassName="h-[length:36px]"  iconSrc={!(isHome || isProductInfo) ? "src/assets/icons/cartIconWhite.svg" : undefined} iconPos="left"/>
                            <SvgIconProduct onClick={likeProduct} path={`${isLiked ?'src/assets/icons/heartFilled.svg' : 'src/assets/icons/heartIcon.svg' }`} alt="Ícone para salvar na wishlist" border="true" className={`${(isHome || isProductInfo) ? 'hidden' : ''}`}/>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}