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
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1Mzk2MzMsImV4cCI6MTc3MjE0NDQzM30.Y6IVd7L5qlLvFza9OcOG-D-MiaVQTBZFhFkeLSlKTofdfZz5HCh1VswEP_jnjet8ZRhz3gM1B4Ra5ocozpLbZtwtsb5R3WJg0_2svY1bRf-pkrF9jlLVwpvVXE9Y140a7mh8oKI6-gqcJlJE1JcrXkKXHx72Lhd9itMgOXOmzDOxRXM07MOjFT7FDsyqHExTXfx98gpG173KWp7mxkaaSsPiBqWLkA8Nl0OsbPd-Izre8s05O9SDF9qK2CgGYrtPGe2KPZJmgD7C4y4yiQQFZzhqyAk9tl2ClEKgn473124gjO9k_LJ5J1US665E3MpuIOVACs2pXiOwZLN1WvEdtNpj4u0V7zjA7BOEUs7RjVDWsyhEQEI3OCorhl4CmtJ5cdHzt82JL2V3juxgFq_9O_iMeWW7jq_6dr-qJSDBHsjL9y1BynP9rEDoq_LCf8X77BJgMUKeKkr7j9IxFVMuAg8nHT1lh9SZp0LNxAJ9Is5ariMRH5FqH1cgqhUa0erNuv7Ehacao8Jxxf1bK1eauGLI1-qyH474ePzFmxyWcumX8RMyHooU1i713nuz-hjz_RiLchPDkGpVXPRoh5ZFHuVjq2iptZ7UGDhN0ab24hlrfQ6WYZZu_fhUGKNN1L80WDEjj5b4KP7XCOhhmOrm81D7AABanKsH7nO-ruR4xKs"
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