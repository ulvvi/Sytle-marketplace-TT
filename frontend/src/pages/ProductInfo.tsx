import { Header } from "../components/Header";
import { Breadcrumbs } from "../components/productInfo/Breadcrumbs";
import { ProductGallery } from "../components/productInfo/ProductGallery";
import { ProductInfoTabs } from "../components/productInfo/ProductInfoTabs";
import { ProductPurchasePanel } from "../components/productInfo/ProductPurchasePanel";
import { RelatedProducts } from "../components/productInfo/RelatedProducts";

export function ProductInfo() {
    const productPaths = [
        { label: "Sale", path: "/" },
        { label: "Premium Cotton T-Shirt", path: "/" }
    ]
    return (
        <>
            <Header />
            <main className="flex justify-center">
                <div className="grid grid-cols-2 gap-x-12 mg-0 px-4 py-8 lg:max-w-350">
                    <Breadcrumbs items={productPaths} />
                    <ProductGallery salePrice={29} price={49} />
                    <ProductPurchasePanel />
                    <ProductInfoTabs />
                    <RelatedProducts />
                </div>
            </main>  
        </>
    )
}