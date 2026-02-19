
import { createContext } from "react";
import { Breadcrumbs } from "../components/productInfo/Breadcrumbs";
import { ProductGallery } from "../components/productInfo/ProductGallery";
import { ProductInfoTabs } from "../components/productInfo/ProductInfoTabs";
import { ProductPurchasePanel } from "../components/productInfo/ProductPurchasePanel";
import { RelatedProducts } from "../components/productInfo/RelatedProducts";
import { useProduct, type Product } from "../hooks/useProduct";
import { useParams } from "react-router-dom";

export const ProductInfoContext = createContext<Product | null>({} as Product)

export function ProductInfo() {
    const { id } = useParams();
    const {product, loading} = useProduct(id);
    
    const productPaths = [
        { label: "Sale", path: "/" },
        { label: "Premium Cotton T-Shirt", path: "/" }
    ]



    return (
        <>
            <ProductInfoContext.Provider value={product}>
                <main className="flex justify-center">
                    <div className="grid grid-cols-2 gap-x-12 mg-0 px-4 py-8 lg:max-w-350">
                        <Breadcrumbs items={productPaths} />
                        <ProductGallery />
                        <ProductPurchasePanel />
                        <ProductInfoTabs />
                        <RelatedProducts />
                    </div>
                </main>  
            </ProductInfoContext.Provider>
        </>
    )
}