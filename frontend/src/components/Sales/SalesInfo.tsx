interface SalesInfosProps{
    text: string
}
export function SalesInfo({text} : SalesInfosProps){
    return(
        <div className="w-full rounded-full bg-white p-2.5">
            <p className="text-center text-red-text text-[1.125rem] font-semibold">{text}</p>
        </div>
    )
}