interface SalesStatsProps{
    maxDiscount: number,
    totalItens: number,
    timeLeft: number,
    shippingDiscount: number
}
export function SalesStats({maxDiscount, totalItens, timeLeft, shippingDiscount}: SalesStatsProps){
    return(
        <div className="w-full bg-[#F3F4F64D] p-4 flex justify-center">
            <section className="grid auto-rows-max grid-cols-2 lg:grid-cols-4  lg:grid-rows-1  gap-x-20 gap-y-10 lg:self-center lg:w-300 text-center text-red-text font-bold text-3xl">
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
        </div>
    )
}