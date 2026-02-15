import { SalesInfo } from "./SalesInfo";

export function SalesHero(){
    return(
        <section className="relative w-full bg-linear-to-r  from-red-grad  to-pink-grad  py-20 px-4 flex justify-center">
            <div className=" absolute bg-black/20 h-full w-full z-0 top-0 left-0"/>
            <div className="z-2 gap-6 flex flex-col items-center">
                <h2 className="text-5xl text-white z-2 font-bold">MEGA SALE</h2>
                <p className="text-white text-center text-[1.25rem]">Up to 70% off on selected items. Limited time offer - don't miss out!</p>
                <div className="flex flex-col gap-4 w-full lg:flex-row">
                    <SalesInfo text="Free shipping on all sale items"/>
                    <SalesInfo text="Extra 10% off for members"/>
                </div>
            </div>
            
        </section>
    )
}