interface SvgProps{
    path: string,
    alt: string,
    border: string,
    className: string
}
export function SvgIconProduct({path, alt, border, className} : SvgProps){
    return(
        <img src={path} alt={alt} className={`${border === 'true' ? 'border border-(--border-primary)' : ''} rounded-[0.65rem] px-2.5 ${className}`}/>
    )
}