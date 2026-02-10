import { Link } from "react-router-dom"
import { Navbar } from "./Navbar"

export function Header() {
    return (
        <>
        
            <header className="mg-0 border-b z-10 border-(--border-primary) backdrop-blur-xs sticky top-0">
                <div className="w-full h-full absolute -z-10 bg-secondary opacity-60"></div>
                <div className="bg-primary text-secondary text-center content-center min-h-9 text-[0.875rem] py-2">Free shipping on orders over $100 | New arrivals daily</div>
                <Navbar />
            </header>
        
        </>
    )
}