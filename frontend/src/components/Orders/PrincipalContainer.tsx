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
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1NDM5MDgsImV4cCI6MTc3MjE0ODcwOH0.aE12XbbPwr8LWR8dRT73qUXn1HMU6MLUMlJRyKTQ8dk9IDGNiSf1HKLeNU9oPhSwnFomRmV5_gL9uXdGdWb_lKjGK1Lm1RQKpfI1utgfdJ6yAQyAHoeRJ8S7UKVgzeav0HsfydrNAoHCNB4lJ61fntgtc-f-MeXT9VuFoNDiZhlVYz9N9itPcpHmA2st6WTXZqEWgAcYWUfBNqAplqnEfng0S9B0Hd9IzA6x-X0i1wi-wqE9R1giVrxDtqxgOFIPI1UwRjROuQzdTN60oUCQuG84aGw8BcbPwH5vOMcGivq_lL-Nr44HM9ROP2XUOimq8MS0K68LoM4GNiJL8Dl9e0yV2iV06LX3BxIL1ZSyzZ44DhCuEScMmFSYs86BBQJUt8_z3_MMELRylVRLd_aYNqmPyeacaPRtTwEcX47fHHPtT7Afa_cMJTFjzqDf0Bi2dr3tBemBIL3m41qo-ne-CV1JIGZyQQnipyIBusJZbH3wMU49LgeSqysnbTZsjl6LL8nVvo4ljzqul5P3TCa4y8AdC2iZ2C7wX8cp1ErmQxDseN2krJPSNN-JEB0RM90dJGnebH-nnh1mVxDocXqPWOtyKc1lnSr_NNfi8_3do658utpMeEz9SlemV7b7T3UTOfcIgKDnu4D1DQoHyd-Gti5q7IoBL3L-WPl9kljdusU"
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