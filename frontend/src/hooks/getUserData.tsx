import { useState, useEffect } from "react"
import type { userInfo } from "../contexts/userContext"

export function useUserData(){
    const [userData, setUserData] = useState<userInfo | null>(null)
        useEffect(()=>{
            const getUserInfo = async() =>{
                
                const id = 1
                const url = `http://localhost:3333/user/${id}`
                const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE1MzU4NDcsImV4cCI6MTc3MjE0MDY0N30.RFnOBG1Vdw4bqluW_AWgtIIEoK7HZ4FgQNPX4UbCpWSkBYWgZvxsBHfgheEY6_bkOMF_ispQ7VlckEFe36Spv9e-eBoOFM6r1lqb0sMOf27DieKjLcWvvfA2bBJEtJI-dWaYMIwgQnb_Lb5tpRvNo4if7rItR97lrA8JJYVp7JKRbb3aulcxoW1JDnl_YNXicoky4TsvJG6RQXIHzcwAvS6tzdq9E_kalOWLDwxy1R4vafUWDzfSpyv4ggzNREduycGIC4ckuHQKoZGfK7y9h_sdBVKeILH6cggSQLFo-QobBvLVkoCjWz7X7Nt_VdYs8ytlhJNrQWPMYN78nMDCMunKfdywa6E6JvgTZLzv2f9lr3FuiFrrCj0hDIImcDhfxuBfr7NOpdvHbR8ZCAl3S6n5qVZpM-NCiogkUnLXSguGKvGJ-TWYn5i7ddYZ5nhTCDV9clzmHBu_mPtMp8a5ofc7yrcuPFosYNvHEZlhhhzMICkC8wqd0v3UOEhYwSIZn8JE90MxBx1gvi0XoJBgNwLny_uv8TSl06iL8ncUhK-_8ym9msPL4WtDzNh7JNlQqfrD6jWdZ8eOrSzQpdE5l8vJ1m2ekLm2D9KBtEdlKOQ1ivHrJYV6gWSVR7SAybU2lVSOkuRIO-YpehF2udJxSu4fJ5KoItXLN-VmsSzQOs8"
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