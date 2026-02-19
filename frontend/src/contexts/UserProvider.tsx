import { createContext, useEffect, useState, type ReactNode } from "react";

interface User {
    id: number;
    firstName: string,
    lastName: string,
    email: string,
    gender?: "FEMALE" | "MALE" | "OTHER",
    phoneNumber?: string,
    dateBirth?: Date,
    totalOrders: number,
    totalRating: number,
    totalWishlist: number,
    emailNotification: boolean,
    smsNotification: boolean,
    marketingEmail: boolean,
    orderUpdate: boolean,
    newArrival: boolean,
    saleAlert: boolean,
}

interface UserContextType {
    user: User | null;
    isLogged: boolean;
    login: (email:string, password:string) => void;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider({children}:{children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);


    async function login(email:string, password:string){
        
        const authResponse = await fetch(`http://localhost:3333/signIn/`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-type": "application/json"
                }
            })


        if (!authResponse.ok){
            setUser(null)
            return;
        }

        const authData = await authResponse.json();

        localStorage.setItem('styleToken', authData.token);
        localStorage.setItem('styleUserId', authData.userId);

        const userResponse = await fetch(`http://localhost:3333/user/${authData.userId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("styleToken")}`
                }
            })

        if (!userResponse.ok){
            setUser(null)
            return;
        }

        const userData = await userResponse.json();

        setUser(userData)
        
    }

    useEffect(() => {

        const token = localStorage.getItem('styleToken');
        const userId = localStorage.getItem('styleUserId')

        if (token && userId){
            const requestData = async () => {

                try{
                    const response = await fetch(`http://localhost:3333/user/${userId}`, {
                        method: "GET",
                        headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("styleToken")}`
                        }
                    })
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData)
                    } else {
                        localStorage.clear();
                    }
                    
                } catch {
                    console.error("Erro ao validar sessão")
                }
            }
            requestData();
        }
    }, [])

    const isLogged = !!user;
    return (
        <>
            <UserContext.Provider value={{user, isLogged , login}}>
                {children}
            </UserContext.Provider>
        </>
    )
}