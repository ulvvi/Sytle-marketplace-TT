import { useState, useEffect } from "react"
import type { userInfo } from "../contexts/userContext"

export function useUserData(){
    const [userData, setUserData] = useState<userInfo | null>(null)
        useEffect(()=>{
            const getUserInfo = async() =>{
                
                const id = 1
                const url = `http://localhost:3333/user/${id}`
                const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE0NjE3MDksImV4cCI6MTc3MjA2NjUwOX0.X3sFUjU6tab3DehJHRhlh9HkeO8051AzeBCv8wWSqRlKPBMNtrjl2PDSKOwOLUsYQtjOPc0JUklDbsFLXXXvXNc7IUWgvxNiKr8rtIDiPDPmTXO_HHNjumZv83nTxOBcQ4x7eYExQHseQUemHLGKOKE_qn-JGdFhXtOd9rsVffauI-Nz529YVpC30VzxuGZJnmmIAE6s5ZLqBf9Bf2FGLYEbBFFRAokzmNZqXBgGrCv8p8fSpD0OQBkx9J4jedy6im92DDaUVMnfyK7gYUaZFen7u1TLLSO9WZOPfEDimBXilj4ZUnqkumPFtgiFkl2PVkhnWRTIiPBNXc1ywq6F7N7R2bVFMMuZV7meCHQxkdSKFgYuMrRO3g6nDFodST2E7newHx0G_klwFzWu7KAfXUBmpybxd4N--pcmxAoMO4sgHaECJFoi5iZp5ERiqH8N2CLea5M66U-3wtfgMeyTja7vfryAFPFlIzhJR_0lSv-CwhaGa3CTjy2xI49Ei3vjxJx4Qyqh5lExx1dieZf-mNKUvHei5aZqimgwh8vnsRnWItqOq9WySvzW6Udakj7u7EAW3vMWdNQ9be0NuyXDMduH6ivT7dN7HNZhZ8tPmjpnkwYAQL2wOXETaiJYRcUQlA5cqvnWs3RGy8Gwd2HaOmqM01zacF2L7piWjBfF_wg"
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