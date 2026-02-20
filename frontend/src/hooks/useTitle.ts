import { useEffect } from "react";

export function useTitle(title?: string) {
    useEffect(() => {
        const defaultTitle = "Style";
        
        document.title = title ? `Style | ${title} ` : defaultTitle;

    }, [title]);
}