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
    }, [user])

    //disparado no onchange, isso aqui ja é pra att o data que vai ser enviado pelo handlesubmit
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = e.target;
        setFormData( (prevData)=>{
            if(!prevData) return prevData
            console.log(formData)
            return{
                ...prevData,
                [name]: value,
            }
        });
    } 


    async function handleSubmit(e:React.MouseEvent){
        e.preventDefault()
        const id = 3
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjN9LCJpYXQiOjE3NzE0MzM2NTAsImV4cCI6MTc3MjAzODQ1MH0.WBbq3ZOjRhAtFvv9Q9FGwBIvu5TMbfTSppfQofWzsVzki1y049hYSgVQS0Px4H7VugyLMS-l8xcjJTEZNPc8Rn_CBXFvnEFLgf2H7Pk9MYkc2rWeNAjfAhjCeZWp8kTt3FoCBna2bdeUfa1kDUQ1mG-PlqvUczdqp427yqIRHNrYzXaVrxEUmiwKE0k6ThojNmnn5D4igcIjFnLrFwIS4jep3xDpcttLvTvzgz2XcdLKwwhnE2tOBpvfqQtTPlsuyPBVjcatpeVob1SO7dpnlQWaL1Ddx5a8JX_xViUU0F_ZZfkXGdk2QbzWaRB3dFcWtEgmIGKa9lE9dXixtxUQg2RwBt6Upt9Jt01bv2LjdMHGgVIBNcnVIzrZJ44Z2e9dxXDFHLsT2j2O93c0lexTrSvAP_vaqZvlAVTPiy973FDuAQ-XlejpNKt3WiTqqbuYPVMzIb0spF-rHjeYWu-9VECu6a7Tj69NkfBDJ4qU6io1K02DTKQMEjciFPqgGaw3JEAe5-Kk83e1GBrHWzPpAuG_myjECjm2jPRWPXVBAsUCpRqT88lqsKeIfBD1nXeijjVq8yDnjwVzAXvk3hzmlFyDG7knORziVRveWJiTFBtE3sOGB3oAcxCijAiOTLf9dTVYYSsYOLEZzIp8PP9DqcAXYSBiqN7qVT6y-c8ahHk"
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
                        {label: "Female", value:"FEMALE"}
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