

import { SalesHero } from "../components/Sales/SalesHero";

import { SalesStats } from "../components/Sales/SalesStats";
import { Filter } from "../components/Sales/Filter";
import { ProductSection } from "../components/Sales/ProductSection";
import { Footer } from "../components/home/Footer";
import { useTitle } from "../hooks/useTitle";

export function Sales(){
    useTitle("Sales")
    return(
        <>
            <div className="flex flex-col w-full m-0">
                <SalesHero/>
                <SalesStats maxDiscount={70} totalItens={500} timeLeft={48} shippingDiscount={100}/>
                <section className="w-full p-6 lg:flex lg:justify-center gap-8">
                    <Filter/>
                    <ProductSection/>
                </section>
                <Footer footerStyle="Sales"/>
            </div>
        </>
    )
}