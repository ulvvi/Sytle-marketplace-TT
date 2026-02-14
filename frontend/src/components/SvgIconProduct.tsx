interface SvgProps{
    path: string,
    alt: string,
    border: string,
    className?: string
    color?: string
    onClick?: () => void
}
export function SvgIconProduct({path, alt, border, className, color, onClick} : SvgProps){
    return(
      
            <button  onClick={onClick} 
                className={`${border === 'true' ? 'border border-(--border-primary)' : ''} rounded-[0.65rem] 
                p-2.5 ${className} ${color} cursor-pointer` }>
                <img src={path} alt={alt} />
            </button>
     
    )
}