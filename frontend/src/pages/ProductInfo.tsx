import { Header } from "../components/Header";
import { Breadcrumbs } from "../components/productInfo/Breadcrumbs";

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
            </main>  
        </>
    )
}