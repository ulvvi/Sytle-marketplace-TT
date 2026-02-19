import type { ReactNode } from "react"

interface PersonCardName {
    photo?: ReactNode;
    name?: String;
    lastName?: string
    email?: String;
    orders?: ReactNode;
    memberSince?: ReactNode;

}


export function PersonCardName ({
    photo = <div className="h-20 w-20 flex items-center justify-center rounded-full  bg-[#F3F4F6]">
                    <span className="text-[0.875rem] font-semibold">JD</span>
                </div>,
    name,
    email,
    orders,
    memberSince,
    lastName
    }: PersonCardName) {
    return(
        <>
            <div className="flex justify-start gap-[24px] items-center self-start w-full">
                {photo}
                <div className="flex flex-col ">
                    <div>
                        <h1 className="font-bold text-[30px] ">{name + ' ' + lastName} </h1>
                    </div>
                    <div>
                        <h2 className="text-tertiary text-[16px]">{email}</h2>
                    </div>
                    <div>
                        <div className="flex justify-end gap-[16px] pt-[8px]">
                            <div className="items-center bg-[#F3F4F6] rounded-[10px] flex pt-[3px] pr-[11px] pb-[3px] pl-[11px]">
                                <span className="font-semibold text-[12px]">{orders} Orders</span>
                            </div>
                            <div className="items-center bg-[#F3F4F6] rounded-[10px] flex pt-[3px] pr-[11px] pb-[3px] pl-[11px]">
                                <span className="font-semibold text-[12px]">Member since {memberSince}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        
        
        
        </>
    )
}