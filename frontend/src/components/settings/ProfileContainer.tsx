import { TabList } from "./TabList";
import { ContentBox } from "./ContentBox";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { SwitchButton } from "./SwitchButton";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { Navigate, useNavigate } from "react-router-dom";

interface ProfileContainerProps {
    orders?: number
    wishlist?: number
    rating?: number
}
//const navigate = useNavigate();

type userPreferences = {
    emailNotification: boolean,
    smsNotification: boolean,
    marketingEmail: boolean,
    orderUpdate: boolean,
    newArrival: boolean,
    saleAlert: boolean,
}

export function ProfileContainer (  ){
    const user = useContext(userContext)
    const [preferencesData, setPreferencesData] = useState<userPreferences>()
    useEffect(()=>{
        if(user){
            setPreferencesData({
                emailNotification: user.emailNotification,
                smsNotification: user.smsNotification,
                marketingEmail: user.marketingEmail,
                orderUpdate: user.orderUpdate,
                newArrival: user.newArrival,
                saleAlert: user.saleAlert
            })
        }
    }, [user])


    async function deleteUser(){
        try{
            const id = 1
            const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1Mzc1NjAsImV4cCI6MTc3MjE0MjM2MH0.F-W8epeSXM7hEIHlv6o4BfZYI1UtfTxw2a3ETAor8n5jRaLIDWRAZy_YEE5SCkrhjp1n_rd3AbjDwlo8q5C1mESksxJjkBUJ3oEW8WbSX9tXCp8its9XEk5OH3EdQXeRwzF3e1Px8cp0_RKuiOuGd7V2R67Q5mLfZyuQ48JiRhv95v68e56OMBqTd53vKS4Qd7xMDOMtRoWiUkTLPqn4SQd1F5BNzMmTL6B2vLSFqPf8gtjj__oWxDa-PYjMn4ggvBJ9Wb2x6xctXSBbvWUeUtZOc_sPTIFmtq9Kj6O0LDmwsLemMSvHprh8uARE48D75IWmzMfqvknwz5veS96hbJQQA0SwLi5hnCgPDOIPp0d2_41e1irRkQIahKuPOIe3eHQ_zadyXpZrxLi-9u2Yb_nvqiQBA4SBGVU16PoLCAlRPOpMg3PFK4QJReNpM-cArv7quUJEtS3GQtVddf8_z94opRkf_ejg_wqFyn_ahfuhuig6WBxPClVp9JeYYgqwBVKKkQKqMNZ1il6uu5JiEit5MNK9H7qXLmybjl1TNVMDWWobQ0VYkRsVCnK-jwK_zoe_E9_h2O9BFiY90EOkgYubTaOGXJUeTtnH6YEbzkaR7Pf2l_fOemisKaWSdI7wIwXae8aCJbunU-u610RlOpLF3oKPpZJDZmg-yh6GeLE"
            const url = `http://localhost:3333/user/${id}`
            const response = await fetch(url,{
                method: "DELETE",
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const result = await response.json();
            console.log(result)
        }catch(error:any){
            console.error(error.message)
        }
        //vai pra home e talvez necessite fazer mais coisas, como apagar o localstorage ou algo do tipo
        //navigate('/home')
    }

    async function update(bodyData : userPreferences){
        const id = 1
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1Mzc1NjAsImV4cCI6MTc3MjE0MjM2MH0.F-W8epeSXM7hEIHlv6o4BfZYI1UtfTxw2a3ETAor8n5jRaLIDWRAZy_YEE5SCkrhjp1n_rd3AbjDwlo8q5C1mESksxJjkBUJ3oEW8WbSX9tXCp8its9XEk5OH3EdQXeRwzF3e1Px8cp0_RKuiOuGd7V2R67Q5mLfZyuQ48JiRhv95v68e56OMBqTd53vKS4Qd7xMDOMtRoWiUkTLPqn4SQd1F5BNzMmTL6B2vLSFqPf8gtjj__oWxDa-PYjMn4ggvBJ9Wb2x6xctXSBbvWUeUtZOc_sPTIFmtq9Kj6O0LDmwsLemMSvHprh8uARE48D75IWmzMfqvknwz5veS96hbJQQA0SwLi5hnCgPDOIPp0d2_41e1irRkQIahKuPOIe3eHQ_zadyXpZrxLi-9u2Yb_nvqiQBA4SBGVU16PoLCAlRPOpMg3PFK4QJReNpM-cArv7quUJEtS3GQtVddf8_z94opRkf_ejg_wqFyn_ahfuhuig6WBxPClVp9JeYYgqwBVKKkQKqMNZ1il6uu5JiEit5MNK9H7qXLmybjl1TNVMDWWobQ0VYkRsVCnK-jwK_zoe_E9_h2O9BFiY90EOkgYubTaOGXJUeTtnH6YEbzkaR7Pf2l_fOemisKaWSdI7wIwXae8aCJbunU-u610RlOpLF3oKPpZJDZmg-yh6GeLE"
        const url = `http://localhost:3333/user/${id}`
        try {
            const response = await fetch(url,{
                method: "PUT",
                body: JSON.stringify(bodyData),
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const result = await response.json();
            console.log(result);
        } catch (error:any) {
            console.error(error.message)
        }
    }

    //att o estado da preferencia em questao. dentro do componente de switch button, espera-se uma prop com args string e bool,
    //e, quando ocorre o evento de onClick, ela executa essa funcao passada pela prop passando como argumento o proprio nome do switch
    //em questao e o inverso de seu valor atual. com isso, é possivel trocar o estado do botao de acordo com esses 2 argumentos passados
    //dentro dele
    function handleSwitchChange(name: string, newValue: boolean){
        setPreferencesData((prevData) =>{
            if(!prevData) return
            console.log(prevData)
            const updatedPreferences = {
                ...prevData,
                [name]:newValue
            };
            update(updatedPreferences)
            return updatedPreferences;
            
        })
    }
   
        
    
    return(
        <>
        <div className="w-full flex flex-col gap-[8px] w-full">
            <TabList texto1="Profile" src1="src/assets/icons/ProfileSmallIcon.svg" alt1="Profile"
                     texto2="Orders"  src2="src/assets/icons/PackageSmallIcon.svg" alt2="Package"
                     texto3="Settings" src3="src/assets/icons/SettingsIcon.svg" alt3="Settings"/>
            <div className="flex flex-col gap-[24px]">
                <ContentBox title="Notification Preferences" titleIconSrc="src/assets/icons/notificationIcon.svg">
                        <SwitchButton onChange={handleSwitchChange} name="emailNotification" checked ={preferencesData?.emailNotification} label="Email Notifications" message="Receive notifications via email"/>
                        <SwitchButton onChange={handleSwitchChange} name="smsNotification" checked ={preferencesData?.smsNotification} label="SMS Notifications" message="Receive notifications via text message"/>
                        <SwitchButton onChange={handleSwitchChange} name="marketingEmail"  label="Marketing Emails" checked={preferencesData?.marketingEmail} message="Receive promotional emails and offers"/>
                        <SwitchButton onChange={handleSwitchChange} name="orderUpdate" label="Order Updates" checked={preferencesData?.orderUpdate} message="Get notified about order status changes"/>
                        <SwitchButton onChange={handleSwitchChange} name="newArrival" label="New Arrivals" checked={preferencesData?.newArrival} message="Be the first to know about new products"/>
                        <SwitchButton onChange={handleSwitchChange} name="saleAlert" label="Sales Alerts" checked={preferencesData?.saleAlert} message="Get notified about sales and discounts"/>
                </ContentBox>

                <ContentBox title="Account Security" titleIconSrc="src/assets/icons/securityIcon.svg">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col min-w-[164px] items-start">
                        <h2 className="text-[16px]/5 font-semibold">Change Password</h2>
                        <span className="text-[14px]/5 text-tertiary">Update your account Password</span>
                    </div>
                    <Button texto="Update Password" buttonClassName="!h-40px !w-[144px]" color="white" link=""/>
                </div>
                
                <div className="w-full h-[1px] bg-[#E5E7EB]"></div>

                <div className="flex justify-between w-full">
                    <div className="flex flex-col min-w-[164px] items-start">
                        <h2 className="text-[16px]/5 font-semibold text-[#DC2626]">Delete Account</h2>
                        <span className="text-[14px]/5 text-tertiary">Permanently delete your account and data</span>
                    </div>
                    <Button texto="Delete Account" onClick={deleteUser} buttonClassName="!h-40px !w-[144px]" color="red" link=""/>
                </div>

                </ContentBox>
            </div>
        </div>
        
        
        </>
    )
}