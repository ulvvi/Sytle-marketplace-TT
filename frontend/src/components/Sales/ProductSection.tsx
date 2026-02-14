import { ProductCard } from "../ProductCard"

export function ProductSection(){
    return(
        <div className="py-6">
            {/**div de sale items  */}
            <div>
                
                <div>

                </div>
                <div>

                </div>
            </div>
            <ProductCard title="Premium Cotton T-Shirt" ratingAvg={4.8} ratingQuantity={124} currentPrice={29} cardStyle="Sales" category="Tops" oldPrice={49}/>
            
        </div>
    )
}