import { TabList } from "./TabList";
import { ContentBox } from "./ContentBox";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { useContext, useEffect, useState } from "react";
import { userContext, type userInfo } from "../../contexts/userContext";


export function ProfileContainer (){
    const user = useContext(userContext)

    const [formData, setFormData] = useState<userInfo>()
    //isso é pra att o setformData após encontrar o usuário pela get user
    useEffect(() =>{
        setFormData(user)
        console.log(user)
    }, [user])

    //disparado no onchange, isso aqui ja é pra att o data que vai ser enviado pelo handlesubmit
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = e.target;
        const finalValue = (value === '' ? null : value) //tratamento pra strings vazias
        setFormData( (prevData)=>{
            if(!prevData) return prevData
            console.log(prevData)
            return{
                ...prevData,
                [name]: finalValue,
            }
        });
    } 


    async function handleSubmit(e:React.MouseEvent){
        e.preventDefault()
        const id = 1
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1NDM5MDgsImV4cCI6MTc3MjE0ODcwOH0.aE12XbbPwr8LWR8dRT73qUXn1HMU6MLUMlJRyKTQ8dk9IDGNiSf1HKLeNU9oPhSwnFomRmV5_gL9uXdGdWb_lKjGK1Lm1RQKpfI1utgfdJ6yAQyAHoeRJ8S7UKVgzeav0HsfydrNAoHCNB4lJ61fntgtc-f-MeXT9VuFoNDiZhlVYz9N9itPcpHmA2st6WTXZqEWgAcYWUfBNqAplqnEfng0S9B0Hd9IzA6x-X0i1wi-wqE9R1giVrxDtqxgOFIPI1UwRjROuQzdTN60oUCQuG84aGw8BcbPwH5vOMcGivq_lL-Nr44HM9ROP2XUOimq8MS0K68LoM4GNiJL8Dl9e0yV2iV06LX3BxIL1ZSyzZ44DhCuEScMmFSYs86BBQJUt8_z3_MMELRylVRLd_aYNqmPyeacaPRtTwEcX47fHHPtT7Afa_cMJTFjzqDf0Bi2dr3tBemBIL3m41qo-ne-CV1JIGZyQQnipyIBusJZbH3wMU49LgeSqysnbTZsjl6LL8nVvo4ljzqul5P3TCa4y8AdC2iZ2C7wX8cp1ErmQxDseN2krJPSNN-JEB0RM90dJGnebH-nnh1mVxDocXqPWOtyKc1lnSr_NNfi8_3do658utpMeEz9SlemV7b7T3UTOfcIgKDnu4D1DQoHyd-Gti5q7IoBL3L-WPl9kljdusU"
        const url = `http://localhost:3333/user/${id}`
        try{
            console.log(formData)
            const response = await fetch(url,{
                method: "PUT",
                body: JSON.stringify(formData),
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const result = await response.json()
            console.log(result)
            //da reload na pagina so pra dar um feedback visual
            window.location.reload()
    
        }
        catch(error:any){
            console.error(error.message)
        }
        
    
    }
    return(
        
        <>
        <div className="w-full flex flex-col gap-[8px] w-full">
            <TabList texto1="Profile" src1="src/assets/icons/ProfileSmallIcon.svg" alt1="Profile"
                     texto2="Orders"  src2="src/assets/icons/PackageSmallIcon.svg" alt2="Package"
                     texto3="Settings" src3="src/assets/icons/SettingsIcon.svg" alt3="Settings"/>
            <div className="flex flex-col gap-[24px]">
                <ContentBox title="Personal Information" buttonColor="white" buttonName="Cancel" buttonIconSrc="src/assets/icons/pencilIcon.svg" buttonIconPos="left" buttonIconAlt="pencil" buttonLink="/" >
                <div className="w-full gap-[24px] flex flex-col lg:grid lg:grid-cols-2">
                    <InputText name="firstName" onChange={handleChange} label="First Name" type="text" textClassName="text-primary" texto={user?.firstName}/>
                    <InputText name="lastName" onChange={handleChange} label="Last Name" type="text" textClassName="text-primary" texto={user?.lastName}/>
                    <InputText name="email" onChange={handleChange} label="Email" type="email" textClassName="text-primary" texto={user?.email}/>
                    <InputText name="phoneNumber" onChange={handleChange} label="Phone" type="tel" textClassName="text-primary" texto={`${user?.phoneNumber ? user.phoneNumber : 'Enter your Phone Number'}`}/>
                    <InputText name="dateBirth" onChange={handleChange} label="Date of Birth" type="date" textClassName="text-primary" value={ `${formData?.dateBirth ? new Date(formData.dateBirth).toISOString().split("T")[0] : ''}`} />
                    <InputText name="gender" onChange={handleChange} label="Gender" texto="Gender" textClassName="text-primary" value = {formData?.gender} options={[
                        {label: "Male", value:"MALE"},
                        {label: "Female", value:"FEMALE"},
                        {label: "Other", value: "OTHER"}
                    ]}/>
                        <div className="flex items-end justify-start w-full pt-[16px] gap-[16px]">
                            <Button onClick={handleSubmit} texto="Save Changes" link="/Profile" buttonClassName="!w-[120px]"/>    
                            <Button texto="Cancel" link="/Profile" color="white" buttonClassName="!w-[76px]"/>
                        </div>
                </div>
                    
                    
                </ContentBox>
                <div className="w-full gap-[24px] flex flex-col lg:flex-row">

                
                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/packageIcon.svg" alt="package" />
                        <span className="text-[24px]/8 font-bold">{user?.totalOrders}</span>
                        <span className="text-[14px]/5 text-tertiary">Total Orders</span>
                    </div>
                </ContentBox>

                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/redHeartIcon.svg" alt="Heart" />
                        <span className="text-[24px]/8 font-bold">{user?.totalWishlist}</span>
                        <span className="text-[14px]/5 text-tertiary">Whishlist Items</span>
                    </div>
                </ContentBox>

                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/yellowStartIcon.svg" alt="Star" />
                        <span className="text-[24px]/8 font-bold">{user?.totalRating}</span>
                        <span className="text-[14px]/5 text-tertiary">Avg. Rating</span>
                    </div>
                </ContentBox>
                </div>
            </div>
        </div>
        
        
        </>
    )
}