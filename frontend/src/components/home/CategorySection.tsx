import { CategoryCard } from "../CategoryCard";

export function CategorySection() {
    return (
        <>
            <section className="mb-20 mt-20 px-4">
                <h2 className="text-primary text-center text-[2.25rem] font-bold mb-4">Shop by Category</h2>
                <p className="text-tertiary text-center text-[1.25rem] mb-16">Explore our carefully curated collections for every style and occasion</p>
                <div className="flex flex-col gap-6 justify-center items-center lg:flex-row">
                    <CategoryCard title="Women's Fashion" quantity={500}/>
                    <CategoryCard title="Men's Fashion" quantity={350}/>
                    <CategoryCard title="Accessories" quantity={200}/>
                    <CategoryCard title="Shoes" quantity={180}/>
                </div>
            </section>
        </>
    )
}