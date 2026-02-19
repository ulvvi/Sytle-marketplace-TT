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
            const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE0Mzg1MzcsImV4cCI6MTc3MjA0MzMzN30.CRhBpa0oFgAV9IvupWb0V7d2HQXd3z1nrYhBn3dkoM_TQMJMobxVes3ksl5HxYitip_wl75JYogiQVRBU6slIvFTu2gKrxuNmzCmsREorMi6aiUv7oXAD18GbVSOp_Q6EzVc27Cx89oMycbBAgX5QT2OUhx8fUBB357w--jBj7SjxwrIlP0jXqdnzTnLedk5f1Om9fGmbLpXYkHpHygyftR2jSIg9Pkv98PJ5S7sFLRuoM2fTxSWmV_4tSCSHqIVeqyW5O2MBqDj-cNAxpaHkwm0Znzx5x6xK90Izde_Ih0rRWZ2KVU7efBau1dtSEqvcuMb6C0gT_ueVKz260n9lRDsnA0HpYrBPkn2BiOt5JqFSAv5a9ZlVF_Dg5IW4doX2N8PHm1QbCIULB9VnCBrSPFZ8B0fjpFFmRRsVX-KhNQa6QmYGXxyc43uBF0r69i3zHYY8UUL581S4vmeWgFbndHscBTL5_ex_oW8rhSPTp1xqQv_09rS7H6qRf8PTVeIw-nfBmU_FPu87EiuFhf8XTDBlennZLIDZDzRwaUgO7HSbcgX_7Hcp_bU2UPIbQEI52jFRUh2NfR90RQ4fFWq6j-uULfq6KV0HbNOGlsmQGpGdJc2m0cNNvXFkIsP3Yq_sfeOcWIQLvUffis9zFDO0xiapP2VGGU3Yyn2f3ruMsg"
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
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE0Mzg1MzcsImV4cCI6MTc3MjA0MzMzN30.CRhBpa0oFgAV9IvupWb0V7d2HQXd3z1nrYhBn3dkoM_TQMJMobxVes3ksl5HxYitip_wl75JYogiQVRBU6slIvFTu2gKrxuNmzCmsREorMi6aiUv7oXAD18GbVSOp_Q6EzVc27Cx89oMycbBAgX5QT2OUhx8fUBB357w--jBj7SjxwrIlP0jXqdnzTnLedk5f1Om9fGmbLpXYkHpHygyftR2jSIg9Pkv98PJ5S7sFLRuoM2fTxSWmV_4tSCSHqIVeqyW5O2MBqDj-cNAxpaHkwm0Znzx5x6xK90Izde_Ih0rRWZ2KVU7efBau1dtSEqvcuMb6C0gT_ueVKz260n9lRDsnA0HpYrBPkn2BiOt5JqFSAv5a9ZlVF_Dg5IW4doX2N8PHm1QbCIULB9VnCBrSPFZ8B0fjpFFmRRsVX-KhNQa6QmYGXxyc43uBF0r69i3zHYY8UUL581S4vmeWgFbndHscBTL5_ex_oW8rhSPTp1xqQv_09rS7H6qRf8PTVeIw-nfBmU_FPu87EiuFhf8XTDBlennZLIDZDzRwaUgO7HSbcgX_7Hcp_bU2UPIbQEI52jFRUh2NfR90RQ4fFWq6j-uULfq6KV0HbNOGlsmQGpGdJc2m0cNNvXFkIsP3Yq_sfeOcWIQLvUffis9zFDO0xiapP2VGGU3Yyn2f3ruMsg"
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