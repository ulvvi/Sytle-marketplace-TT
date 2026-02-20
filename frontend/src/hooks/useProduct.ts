import { useEffect, useState } from "react";

export interface Product {
    id: number,
    name: string,
    rating: number,
    price: number,
    SalePrice: number,
    numOfReviews: number,
    isOutOfStock: boolean,
    variant: Variant[],
    categories: Category[]
    collection: Collection | null
    description: String
}

export interface Variant {
    id: number,
    color: string,
    size: string,
    stock: number,
    productId: number,
}

export interface Category {
    id: number,
    type: string

}

export interface Collection {
    id: number,
    type: string

}




export function useProduct(productId?: number | string) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(!!productId);

    const fetchProduct = async (id: number | string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3333/product/${id}`, {
                        method: "GET",
                        headers: {
                        "Content-type": "application/json",
                        }
                    })
            
            if (!response.ok) throw new Error();

            const productData = await response.json();
            setProduct(productData);

            return productData;
        } catch (err) {
            console.error("Erro ao conseguir dados do produto")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (productId){
            fetchProduct(productId)
        }
    },[productId]);

    return { product, loading, fetchProduct, setProduct }
}