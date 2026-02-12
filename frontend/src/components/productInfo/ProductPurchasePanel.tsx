import { InfoBarProduct } from "./InfoBarProduct";
import { ProductHeader } from "./ProductHeader";
import { PurchaseActionButtons } from "./PurchaseActionButtons";
import { VariantContainer } from "./VariantContainer";

export function ProductPurchasePanel() {
    const productColors = [{colorName: "Black", colorHex: "#030711"}]
    return (
        <>
            <section className="mt-8">
                <ProductHeader />
                <hr className=" border-(--border-primary)"/>
                <VariantContainer colors={productColors}/>
                <hr className=" border-(--border-primary)"/>
                <PurchaseActionButtons/>
                <hr className=" border-(--border-primary)"/>
                <InfoBarProduct/>
                <hr className=" border-(--border-primary)"/>
            </section>
        </>
    )
}