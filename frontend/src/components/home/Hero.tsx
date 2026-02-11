import { Button } from "../Button";

interface HeroProps {
    imgSrc?: string
    imgAlt?: string
}

export function Hero({imgSrc="/src/assets/placeholder.svg", imgAlt}:HeroProps) {
    return (
        <>
            <section className="flex flex-col justify-center h-136.5 relative overflow-hidden lg:h-210">
                <img className="w-full h-full absolute object-cover z-0 opacity-20" src={imgSrc} alt={imgAlt}></img>
                <div className="absolute inset-0 bg-linear-to-b from-[#F3F4F64D] to-[#F3F4F61A]"/>
                <div className="relative self-center flex flex-col gap-6 px-4 justify-between max-w-3xl
                lg:w-176 lg:min-w-176 lg:h-60.5 lg:items-center">
                    <h1 className="text-transparent text-center align-middle text-[3rem] max-w-2xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text
                    lg:leading-18 lg:text-[4.5rem] lg:p-3 lg:-m-3">Style Redefined</h1>
                    <p className="text-tertiary text-center text-[1.25rem] max-w-2xl lg:text-[1.4rem] lg:w-142.25">Discover the latest trends in fashion. Premium quality, sustainable materials, timeless designs.</p>
                    <div className="flex flex-col gap-4 lg:flex-row lg:px-[51.5px]">
                        <Button texto="Shop Now" link="" buttonClassName="h-[48px] lg:w-45.5" textClassName="text-[length:1.125rem]" iconSrc="/src/assets/icons/whiteArrowIcon.svg"/>
                        <Button texto="View Collection" color="white" link="" buttonClassName="h-[48px] lg:w-45.5" textClassName="text-[length:1.125rem]"/>
                    </div>
                </div>
            </section>
        </>
    )
}