import { useState, useEffect } from "react"
import type { userInfo } from "../contexts/userContext"

export function useUserData(){
    const [userData, setUserData] = useState<userInfo | null>(null)
        useEffect(()=>{
            const getUserInfo = async() =>{
                
                const id = 1
                const url = `http://localhost:3333/user/${id}`
                const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1NDM5MDgsImV4cCI6MTc3MjE0ODcwOH0.aE12XbbPwr8LWR8dRT73qUXn1HMU6MLUMlJRyKTQ8dk9IDGNiSf1HKLeNU9oPhSwnFomRmV5_gL9uXdGdWb_lKjGK1Lm1RQKpfI1utgfdJ6yAQyAHoeRJ8S7UKVgzeav0HsfydrNAoHCNB4lJ61fntgtc-f-MeXT9VuFoNDiZhlVYz9N9itPcpHmA2st6WTXZqEWgAcYWUfBNqAplqnEfng0S9B0Hd9IzA6x-X0i1wi-wqE9R1giVrxDtqxgOFIPI1UwRjROuQzdTN60oUCQuG84aGw8BcbPwH5vOMcGivq_lL-Nr44HM9ROP2XUOimq8MS0K68LoM4GNiJL8Dl9e0yV2iV06LX3BxIL1ZSyzZ44DhCuEScMmFSYs86BBQJUt8_z3_MMELRylVRLd_aYNqmPyeacaPRtTwEcX47fHHPtT7Afa_cMJTFjzqDf0Bi2dr3tBemBIL3m41qo-ne-CV1JIGZyQQnipyIBusJZbH3wMU49LgeSqysnbTZsjl6LL8nVvo4ljzqul5P3TCa4y8AdC2iZ2C7wX8cp1ErmQxDseN2krJPSNN-JEB0RM90dJGnebH-nnh1mVxDocXqPWOtyKc1lnSr_NNfi8_3do658utpMeEz9SlemV7b7T3UTOfcIgKDnu4D1DQoHyd-Gti5q7IoBL3L-WPl9kljdusU"
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