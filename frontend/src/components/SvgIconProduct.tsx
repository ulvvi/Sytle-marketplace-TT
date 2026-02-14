interface SvgProps{
    path: string,
    alt: string,
    border: string,
    className?: string
    color?: string
}
export function SvgIconProduct({path, alt, border, className, color} : SvgProps){
    return(
        <button>
            <img src={path} alt={alt} className={`${border === 'true' ? 'border border-(--border-primary)' : ''} rounded-[0.65rem] p-2.5 ${className} ${color}`}/>
        </button>
    )
}