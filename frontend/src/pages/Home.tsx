import { Header } from "../components/Header";
import { Footer } from "../components/home/Footer";
import { Hero } from "../components/home/Hero";
import { InfoBar } from "../components/home/InfoBar";
import { FeatureProducts } from "../components/home/FeatureProducts";
import { CategorySection } from "../components/home/CategorySection";
import { Link } from "react-router"
export function Home() {
    return (
        <>
            <div className="flex flex-col w-full m-0 overflow-x-hidden">
                <Header />
                <Hero />
                <InfoBar />
                <CategorySection />
                <FeatureProducts />
                <Footer />
            </div>  
        </>
    )
}