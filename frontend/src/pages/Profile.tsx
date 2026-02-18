import { userContext, } from "../contexts/userContext"
import { useState, useEffect } from 'react';
import { PrincipalContainer } from "../components/profile/PrincipalContainer"
import type {userInfo} from "../contexts/userContext"




export function Profile() {
    const [userData, setUserData] = useState<userInfo | null>(null)
    useEffect(()=>{
        const getUserInfo = async() =>{
            
            const id = 1
            const url = `http://localhost:3333/user/${id}`
            const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE3NzE0Mzg1MzcsImV4cCI6MTc3MjA0MzMzN30.CRhBpa0oFgAV9IvupWb0V7d2HQXd3z1nrYhBn3dkoM_TQMJMobxVes3ksl5HxYitip_wl75JYogiQVRBU6slIvFTu2gKrxuNmzCmsREorMi6aiUv7oXAD18GbVSOp_Q6EzVc27Cx89oMycbBAgX5QT2OUhx8fUBB357w--jBj7SjxwrIlP0jXqdnzTnLedk5f1Om9fGmbLpXYkHpHygyftR2jSIg9Pkv98PJ5S7sFLRuoM2fTxSWmV_4tSCSHqIVeqyW5O2MBqDj-cNAxpaHkwm0Znzx5x6xK90Izde_Ih0rRWZ2KVU7efBau1dtSEqvcuMb6C0gT_ueVKz260n9lRDsnA0HpYrBPkn2BiOt5JqFSAv5a9ZlVF_Dg5IW4doX2N8PHm1QbCIULB9VnCBrSPFZ8B0fjpFFmRRsVX-KhNQa6QmYGXxyc43uBF0r69i3zHYY8UUL581S4vmeWgFbndHscBTL5_ex_oW8rhSPTp1xqQv_09rS7H6qRf8PTVeIw-nfBmU_FPu87EiuFhf8XTDBlennZLIDZDzRwaUgO7HSbcgX_7Hcp_bU2UPIbQEI52jFRUh2NfR90RQ4fFWq6j-uULfq6KV0HbNOGlsmQGpGdJc2m0cNNvXFkIsP3Yq_sfeOcWIQLvUffis9zFDO0xiapP2VGGU3Yyn2f3ruMsg"
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
    if(!userData) return;
    return (
        <>  
            <userContext.Provider value = {userData}>
                <div className="w-full min-h-[780px] lg:pr-[260px] lg:pb-[346px] lg:pl-[260px] lg:min-h-[1200px]">
                    <PrincipalContainer/>    
                </div>
            </userContext.Provider>
            
        </>
    )
}

