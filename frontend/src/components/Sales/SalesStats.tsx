interface SalesStatsProps{
    maxDiscount: number,
    totalItens: number,
    timeLeft: number,
    shippingDiscount: number
}
export function SalesStats({maxDiscount, totalItens, timeLeft, shippingDiscount}: SalesStatsProps){
    return(
        <section className="w-full grid auto-rows-max grid-cols-2 bg-[#F3F4F64D] gap-8 p-4 text-center text-red-text font-bold text-3xl">
            <p className="flex flex-col">{maxDiscount + '%'}
                <small className="text-tertiary font-normal text-[0.875rem]">Max Discount</small>
            </p>
            <p className="flex flex-col">{totalItens + '+'}
                <small className="text-tertiary font-normal text-[0.875rem]">Items on Sale</small>
            </p>
            <p className="flex flex-col">{timeLeft + 'h'}
                <small className="text-tertiary font-normal text-[0.875rem]">Time Left</small>
            </p>
            <p className="flex flex-col">{(shippingDiscount == 100) ? 'Free' : shippingDiscount + '%'}
                <small className="text-tertiary font-normal text-[0.875rem]">Shipping</small>
            </p>
            
        </section>
    )
}