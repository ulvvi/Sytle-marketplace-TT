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
      const token = localStorage.getItem('styleToken');
      const userId = localStorage.getItem('styleUserId')
      const url = `http://localhost:3333/order/${userId}`
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