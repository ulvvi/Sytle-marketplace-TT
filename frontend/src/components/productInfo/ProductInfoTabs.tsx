import { useContext } from "react"
import { ProductInfoContext } from "../../pages/ProductInfo"

export function ProductInfoTabs() {
    const product = useContext(ProductInfoContext)
    
    return ( 
        <>

            <section className="col-span-full my-16 flex flex-col gap-4">
                <nav className="flex p-1 bg-[#F3F4F6] rounded-[14px] w-full">
                    <button className={`  bg-secondary font-semibold pt-1.5 pr-[10.5px] pb-1.5 pl-[18.5px] cursor-default rounded-lg text-[0.875rem] w-full` }>
                        Description
                    </button>
                    <button className={` bg-[#F3F4F6] font-semibold text-tertiary pt-1.5 pr-[10.5px] pb-1.5 pl-[18.5px] cursor-pointer rounded-lg text-[0.875rem] w-full` }>
                        Specifications
                    </button>
                    <button className={`bg-[#F3F4F6] font-semibold text-tertiary pt-1.5 pr-[10.5px] pb-1.5 pl-[18.5px] cursor-pointer rounded-lg text-[0.875rem] w-full` } >
                        Reviews ({product?.numOfReviews})
                    </button>
                </nav>
                <article className="flex flex-col gap-4.5 p-6 border border-(--border-primary) rounded-xl">
                    <p className="text-[1.125rem]">Made from 100% premium organic cotton, this t-shirt offers exceptional comfort and style. The perfect
                        addition to your wardrobe for both casual and semi-formal occasions.</p>
                    <div>
                        <h2 className="font-semibold mb-3">Key Features:</h2>
                        <ul className="list-disc pl-5 flex flex-col gap-2.5">
                            <li>100% Organic Cotton</li>
                            <li>Pre-shrunk fabric</li>
                            <li>Reinforced seams</li>
                            <li>Machine washable</li>
                            <li>Eco-friendly dyes</li>
                        </ul>
                    </div>
                </article>
            </section>
        </>
    )
}