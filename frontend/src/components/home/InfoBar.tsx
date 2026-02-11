import { InfoItem } from "./InfoItem";

export function InfoBar() {
    return (
        <>
            <section className="h-185 bg-[#F3F4F64D] py-16 px-4 lg:h-67">
                <div className="h-full flex flex-col gap-8 lg:flex-row lg:justify-center">
                    <InfoItem iconSrc="/src/assets/icons/transportIcon.svg" title="Free Shipping" subtitle="Free shipping on orders over $100" />
                    <InfoItem iconSrc="/src/assets/icons/refundIcon.svg" title="Easy Returns" subtitle="30-day hassle-free returns" />
                    <InfoItem iconSrc="/src/assets/icons/shieldIcon.svg" title="Secure Payment" subtitle="Your payment information is safe" />
                </div>
                
            </section>
        </>
    )
}