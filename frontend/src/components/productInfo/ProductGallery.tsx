import { useContext, useState } from "react";
import { IconButton } from "../IconButton";
import { SvgIconProduct } from "../SvgIconProduct";
import { ProductInfoContext } from "../../pages/ProductInfo";
import { UserContext } from "../../contexts/UserProvider";

interface ProductGalleryProps {
    productPics?: ProductPic[];
}

interface ProductPic {
    imgSrc: string;
    alt?: string;
}

export function ProductGallery({productPics = new Array(4).fill({imgSrc: "/src/assets/placeholder.svg"})}:ProductGalleryProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const isFirstImage = currentImage === 0;
    const isLastImage = currentImage === productPics.length-1;
    const product = useContext(ProductInfoContext)
    const {user, isLogged} = useContext(UserContext)

    const [isLiked, setIsLiked] = useState(false)
    const likeProduct = () =>{
        setIsLiked(!isLiked)
    }

    async function toggleLike(){
        if (isLogged && product && user?.id){   
            if (isLiked){
                const response = await fetch(`http://localhost:3333/user/${user.id}/wishlist/del`, {
                            method: "PUT",
                            headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("styleToken")}`
                            },
                            body: JSON.stringify({
                                productId: product.id
                            })
                })

                if(response.ok){
                    setIsLiked(false)
                }
            } else {
                const response = await fetch(`http://localhost:3333/user/${user.id}/wishlist/add`, {
                            method: "PUT",
                            headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("styleToken")}`
                            },
                            body: JSON.stringify({
                                productId: product.id
                            })
                })
                if(response.ok){
                    setIsLiked(true)
                }
            }
        } else {
            setIsLiked(false)
        }
    }

    const discount = product?.SalePrice ? Math.round( (1 - (product.SalePrice/(product.price as number)))*100 ) : undefined; 

    return (
        <>
            <section className="flex flex-col col-span-full items-center mt-8 lg:col-span-1">
                <div className="aspect-square overflow-hidden rounded-xl relative max-w-100 lg:max-w-full w-full">
                    <div className={`flex absolute top-4 left-4 items-center bg-[#EF4343] px-2.75 rounded-[100rem] h-6 z-1 ${product?.SalePrice ? "inline-block" : "hidden"}`}>
                        <span className={`text-secondary font-semibold text-[0.75rem]`}>-{discount}%</span>
                    </div>
                    <div className="absolute right-4 top-4">
                        <SvgIconProduct color="bg-[#F3F4F6]" border="false" onClick={() => {toggleLike()}} path={`${isLiked ?'/src/assets/icons/heartFilled.svg' : '/src/assets/icons/heartIcon.svg' }`} alt="Ícone para salvar na wishlist" className="hover:opacity-80"/>
                    </div>
                    <IconButton iconSrc="/src/assets/icons/sliderArrowIcon.svg" onClick={() => isFirstImage ? "" : setCurrentImage(currentImage-1)} buttonClassName={`disabled:!cursor-not-allowed disabled:opacity-50 disabled:hover:bg-secondary bg-secondary !absolute left-4 top-1/2 -translate-y-1/2 scale-x-[-1]`} disabled={isFirstImage}/>
                    <img src={productPics[currentImage].imgSrc} alt={productPics[currentImage].alt} className="w-full" />
                    <IconButton iconSrc="/src/assets/icons/sliderArrowIcon.svg" onClick={() => isLastImage ?  "" : setCurrentImage(currentImage+1) } buttonClassName={`disabled:!cursor-not-allowed disabled:opacity-50 disabled:hover:bg-secondary bg-secondary !absolute right-4 top-1/2 -translate-y-1/2`} disabled={isLastImage}/>
                </div>
                <div className="flex flex-row gap-2 my-4 max-w-100 lg:max-w-full w-full">
                    {productPics.map((item, i) => (
                        <button onClick={() => setCurrentImage(i)} className={`rounded-xl overflow-hidden ${ currentImage === i ? "ring-2 ring-primary" : "cursor-pointer hover:scale-103"}`}>
                            <img src={item.imgSrc} alt={item.alt} className="w-full h-full object-cover"></img>
                        </button>
                    ))}
                </div>
            </section>
        </>
    )
}