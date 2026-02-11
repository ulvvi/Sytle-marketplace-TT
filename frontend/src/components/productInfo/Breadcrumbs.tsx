import { Link } from "react-router";

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

interface BreadcrumbItem {
    label: string;
    path: string;
}

export function Breadcrumbs({items}:BreadcrumbsProps) {
    return (
        <>
            <nav>
                <ol className="flex gap-2 text-tertiary text-[0.875rem]">
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    {items.map((item, i) => (
                        <li className="flex gap-2">
                            <span> / </span>
                            <Link to={item.path} className={`${i === items.length -1 ? "text-primary" : ""}`}>{item.label}</Link>
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}