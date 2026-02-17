interface InfoItemProductProps {
    iconSrc: string;
    alt?: string;
    title: string;
    subtitle: string;
}

export function InfoItemProduct({iconSrc, alt, title, subtitle}:InfoItemProductProps) {
    return (
        <>
            <div className="flex flex-col items-center my-6">
                <img src={iconSrc} alt={alt} className="mb-2 aspect-square w-6"></img>
                <h3 className="font-semibold text-center text-[0.875rem]">{title}</h3>
                <p className="text-tertiary text-center text-[0.75rem]">{subtitle}</p>
            </div>
        </>
    )
}