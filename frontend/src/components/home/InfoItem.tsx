interface InfoItemProps {
    iconSrc: string;
    alt?: string;
    title: string;
    subtitle: string;
}

export function InfoItem({iconSrc, alt, title, subtitle}:InfoItemProps) {
    return (
        <>
            <div className="flex flex-col items-center lg:w-[434.66px] lg:h-35">
                <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary opacity-10"></div>
                    <img src={iconSrc} alt={alt} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></img>
                </div>
                <h3 className="mb-2 font-semibold">{title}</h3>
                <p className="text-tertiary text-center text-[1rem] mb-1">{subtitle}</p>
            </div>
        </>
    )
}