import { useState, useEffect } from "react"
import type { userInfo } from "../contexts/userContext"

export function useUserData(){
    const [userData, setUserData] = useState<userInfo | null>(null)
        useEffect(()=>{
            const getUserInfo = async() =>{
                
                const id = 1
                const url = `http://localhost:3333/user/${id}`
                const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1Mzc1NjAsImV4cCI6MTc3MjE0MjM2MH0.F-W8epeSXM7hEIHlv6o4BfZYI1UtfTxw2a3ETAor8n5jRaLIDWRAZy_YEE5SCkrhjp1n_rd3AbjDwlo8q5C1mESksxJjkBUJ3oEW8WbSX9tXCp8its9XEk5OH3EdQXeRwzF3e1Px8cp0_RKuiOuGd7V2R67Q5mLfZyuQ48JiRhv95v68e56OMBqTd53vKS4Qd7xMDOMtRoWiUkTLPqn4SQd1F5BNzMmTL6B2vLSFqPf8gtjj__oWxDa-PYjMn4ggvBJ9Wb2x6xctXSBbvWUeUtZOc_sPTIFmtq9Kj6O0LDmwsLemMSvHprh8uARE48D75IWmzMfqvknwz5veS96hbJQQA0SwLi5hnCgPDOIPp0d2_41e1irRkQIahKuPOIe3eHQ_zadyXpZrxLi-9u2Yb_nvqiQBA4SBGVU16PoLCAlRPOpMg3PFK4QJReNpM-cArv7quUJEtS3GQtVddf8_z94opRkf_ejg_wqFyn_ahfuhuig6WBxPClVp9JeYYgqwBVKKkQKqMNZ1il6uu5JiEit5MNK9H7qXLmybjl1TNVMDWWobQ0VYkRsVCnK-jwK_zoe_E9_h2O9BFiY90EOkgYubTaOGXJUeTtnH6YEbzkaR7Pf2l_fOemisKaWSdI7wIwXae8aCJbunU-u610RlOpLF3oKPpZJDZmg-yh6GeLE"
                try {
                    const response = await fetch(url,{ 
                        method:"GET",
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`)
                }
                const result = await response.json();
                setUserData(result)
                } catch (error:any) {
                    console.error(error.message)
                }
            
            }
            getUserInfo()
        }, [])

    return userData
}