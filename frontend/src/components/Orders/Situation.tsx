interface SituationProps {
    situation: "DELIVERED" | "SHIPPED" | "PROCESSING";

}

export function Situation({situation}:SituationProps){
    return(
        <>
        <div className={`flex items-center px-[11px] pt-[3px] pb-[3px] rounded-[20px] ${situation === "DELIVERED" ? "bg-[#DCFCE7]" : situation === "SHIPPED" ? "bg-[#DBEAFE]" : "bg-[#FEF9C3]"} `}>
            <img src={` ${situation === "DELIVERED" ? "src/assets/icons/deliveredIcon.svg" : situation === "SHIPPED" ? "src/assets/icons/shippedIcon.svg" : "src/assets/icons/processingIcon.svg"} `} alt="situation" />
            <span className="text-[12px]/4">{situation === "DELIVERED" ? "Delivred" : situation === "PROCESSING" ? "Processing" : "Shipped"}</span>
        </div>
        
        
        </>
    )
}