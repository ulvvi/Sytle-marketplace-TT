
import { createContext, useContext, useEffect } from "react";
import { Breadcrumbs } from "../components/productInfo/Breadcrumbs";
import { ProductGallery } from "../components/productInfo/ProductGallery";
import { ProductInfoTabs } from "../components/productInfo/ProductInfoTabs";
import { ProductPurchasePanel } from "../components/productInfo/ProductPurchasePanel";
import { RelatedProducts } from "../components/productInfo/RelatedProducts";
import { useProduct, type Product } from "../hooks/useProduct";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import { useTitle } from "../hooks/useTitle";

export const ProductInfoContext = createContext<Product | null>({} as Product)

export function ProductInfo() {
    const { id } = useParams();
    const {product, loading} = useProduct(id);

    const formatedProductName = product?.name 
        ? product.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : undefined;
    
    useTitle(formatedProductName);

    if(loading){
        return (
            <></>
        )
    }

    if(!product){
        return (
            <>
                <div className="flex flex-col items-center mt-10">
                    <h1 className="font-bold text-[4rem] text-center">404</h1>
                    <h2 className="font-semibold text-[1.5rem] text-center">Produto não encontrado</h2>
                </div>
            </>
        )}


    const productPaths = [
        { label: "Sale", path: "/" },
        { label: formatedProductName as string, path: `/product/${id}` }
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