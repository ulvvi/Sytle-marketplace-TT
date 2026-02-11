import { useState } from "react";
import { IconButton } from "../IconButton";

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

    return (
        <>
            <section className="flex flex-col items-center mt-8">
                <div className="aspect-square overflow-hidden rounded-xl relative">
                    <IconButton iconSrc="/src/assets/icons/heartIcon.svg" buttonClassName="bg-secondary !absolute top-4 right-4"></IconButton>
                    <IconButton iconSrc="/src/assets/icons/sliderArrowIcon.svg" onClick={() => isFirstImage ? "" : setCurrentImage(currentImage-1)} buttonClassName={`${currentImage !== 0 ? "" : "!cursor-default opacity-50 hover:bg-secondary"} bg-secondary !absolute left-4 top-1/2 -translate-y-1/2 scale-x-[-1]`} disabled={isFirstImage}/>
                    <img src={productPics[currentImage].imgSrc} alt={productPics[currentImage].alt} />
                    <IconButton iconSrc="/src/assets/icons/sliderArrowIcon.svg" onClick={() => isLastImage ?  "" : setCurrentImage(currentImage+1) } buttonClassName={`${currentImage !== productPics.length-1 ? "" : "!cursor-default opacity-50 hover:bg-secondary"} bg-secondary !absolute right-4 top-1/2 -translate-y-1/2`} disabled={isLastImage}/>
                </div>
                <div className="flex flex-row gap-2 mt-4">
                    {productPics.map((item, i) => (
                        <button onClick={() => setCurrentImage(i)} className={`rounded-xl overflow-hidden ${ currentImage === i ? "ring-2 ring-primary" : ""}`}>
                            <img src={item.imgSrc} alt={item.alt} className="w-full h-full object-cover"></img>
                        </button>
                    ))}
                </div>
            </section>
        </>
    )
}