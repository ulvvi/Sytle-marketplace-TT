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
            <main className="flex flex-col mg-0 px-4 py-8">
                <Breadcrumbs items={productPaths} />
                <ProductGallery />
                <ProductPurchasePanel />
                <ProductInfoTabs />
                <RelatedProducts />
            </main>  
        </>
    )
}