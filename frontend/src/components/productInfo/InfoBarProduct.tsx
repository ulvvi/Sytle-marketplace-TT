import { InfoItemProduct } from "./InfoItemProduct";

export function InfoBarProduct() {
    return (
        <>
            <section className="">
                <div className="h-full flex gap-4 justify-evenly">
                    <InfoItemProduct iconSrc="/src/assets/icons/transportIcon.svg" title="Free Shipping" subtitle="On orders over $50" />
                    <InfoItemProduct iconSrc="/src/assets/icons/refundIcon.svg" title="Easy Returns" subtitle="30-day return policy" />
                    <InfoItemProduct iconSrc="/src/assets/icons/shieldIcon.svg" title="Secure Payment" subtitle="100% secure checkout" />
                </div>
                
            </section>
        </>
    )
}