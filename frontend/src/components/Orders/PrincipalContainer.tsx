import { useContext, useEffect, useState } from "react";
import { ContentBox } from "./ContentBox";
import { Order } from "./Order";
import { PersonCardName } from "./PersonCardName";
import { ProfileContainer } from "./ProfileContainer";
import { TabList } from "./TabList";
import { userContext } from "../../contexts/userContext";
import type { orderInfo, orderVariantInfo, variantInfo, productInfo } from "../../contexts/userContext";


export function PrincipalContainer(){
  const user = useContext(userContext)
  const [orderData, setOrderData] = useState<orderInfo[]>()
  useEffect( ()=>{
    async function getOrder(){
      const id = 1;
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1MjAwODYsImV4cCI6MTc3MjEyNDg4Nn0.d7BwnkLvTTSR1DBYWCjbRjkZonJIfXQkbHfBx3WzkjF779d6bH6H8UyYa13LUsslaafxQWTfGLEnTa0ZG3O25Np-0udeGAcYDpY5Q5-KZ8ghEucU3crcXLK9kmPba-TS3XgyXi50SOe2MDVPregIyA7bKDPDuUvMfg3E8T-cQg4G17O4o0qMtMZstiDFPAh-NOziWXLk5-JPTMcxQnCuvHjn0YyYf8eflaOutGiJzbZbth8ycaRabKjA-qKng2uk_CqH9uh8hP9vIf7AFDpSwfh29fC7KgTVvLou4YkLVrveuVcir9j9B4q-VWIL_50YR7XbVjas7zUjnzVErb1tNdtp7ScEe-PnFNE8FpupKm3Aoq_i-2Vu_xC35CvLTI4Tv22izOxrrOipW1MeCq2RaBKhfqx_D96W5roU5AzYOEXAYEVgShgdFO97lCrmh0vGqylxSg6c4YSPuHF9BacWwiqoGIqk9cKo3OAqEk5VNVlRXo5l7jBBVkaM2hhvqyvARQE_W6jDl5R_ZNeVxamqcWTgT2ieTSLUuu4W0fV0bjUGEcGaaS7kx_1qrqRSmZSnbqtf0nEq_K1Psl5TiaH8u2tSV1-Ze9ewIg5gw9Bz05drbqqdbiXvQOQcxZlVlO_WkQ-hWo_E4-sqkNsJnJHj0ItmoP-Fi_U3yNxFxlqx34g"
      const url = `http://localhost:3333/order/${id}`
      try {
        const response = await fetch(url,{
          method: "GET",
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(!response.ok){
          throw new Error(`Response status: ${response.status}`)
        }
        const result = await response.json();
        setOrderData(result);
        console.log(result)
      } catch (error:any) {
        console.error(error.message);
      }
      
    }
    getOrder();
  }, [])
    
  if(!orderData) return
  
    

    return(
        <>
            <div className="flex max-w-[1400px] flex-col items-center justify-start gap-[32px] mt-[32px] mb-[32px] ">
            <PersonCardName name={user?.firstName} lastName = {user?.lastName} email={user?.email} orders={user?.totalOrders} memberSince={`${user?.memberSince ? new Date(user.memberSince).toISOString().split('-')[0]: 'Unknown'} `}/>
            </div>
            <div className="flex flex-col items-center gap-[8px] w-full">
                <ProfileContainer/>
                <div className="flex flex-col items-center gap-[24px] w-full">
                    <ContentBox title="Order History" titleClassName="!font-bold" 
                    className="!border-none shadow-none !pt-[4px] !pr-0 !pb-0 !pl-0"
                    buttonName="Export Orders" buttonLink="/Orders" buttonColor="white" buttonIconSrc="src/assets/icons/downloadIcon.svg"
                    buttonIconPos="left" buttonClassName="!w-[155px]">
                    
                    </ContentBox>
                    
                    {orderData?.map( (order)=>(
                      <Order 
                        orderName= {'ORD-' + new Date(order.time).toISOString().split('-')[0] + '-' + order.id}
                        variantes={order.variants}
                        totalPrice={order.totalPrice}
                        time={new Date(order.time).toISOString().split('T')[0]}
                        adress={order.address}
                        rastreio={order.rastreio}
                        situations={order.situation}
                        />
                    ))}
                </div>
                
            </div>
            
            
        </>
    )

}