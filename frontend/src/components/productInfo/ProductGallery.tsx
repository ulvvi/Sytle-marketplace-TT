import { useState } from "react";

interface ProductGalleryProps {
    productPics?: ProductPic[];
}

interface ProductPic {
    imgSrc: string;
    alt?: string;
}

export function ProductGallery({productPics = new Array(4).fill({imgSrc: "/src/assets/placeholder.svg"})}:ProductGalleryProps) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <>
            <section className="flex flex-col items-center mt-8">
                <div className="aspect-square overflow-hidden rounded-xl">
                    <img src={productPics[currentImage].imgSrc} alt={productPics[currentImage].alt} />
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