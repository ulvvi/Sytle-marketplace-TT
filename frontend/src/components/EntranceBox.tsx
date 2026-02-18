import { ButtonIntegration } from "./ButtonIntegration"
import { InputText } from "./InputText"
import { Link } from "react-router"
import { Button } from "./Button"
import { useAuth } from '../contexts/AuthContext'
import { useGoogleLogin } from "@react-oauth/google"
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useState } from "react"
import axios from 'axios'


interface UserData{
    name: string
    email: string
    picture: string
}

export function EntranceBox() {

    const { signIn } = useAuth();

    //1545019629889517 IDFACE
    const [profileImage,setProfileImage] = useState()
    const [user,setUser] = useState<UserData | null>(null);

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("Logado!",tokenResponse)
        try{
            const dados = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers:{
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );
            
            signIn({
                firstName: dados.data.given_name,
                lastName: dados.data.family_name,
                email: dados.data.email,
                picture: dados.data.picture
            });

        } catch (error) {
            console.error("erro ao buscar os dados do usuario", error);
        }

        },
        onError: (tokenResponse) => {
            console.log("Não logado",tokenResponse)
        }
        
    })

    const loginWithFacebook = (response: any) => {
    console.log("Resposta do FB:", response);

    // Verificamos se veio o accessToken (login deu certo)
    
      signIn({
        firstName: response.first_name, 
        lastName: response.last_name,
        email: response.email,
        picture: response.picture?.data?.url // O Facebook manda a foto aqui
      });
  };
    return (
        <>
            <div className=" max-w-[448px] h-[748px] md:h-[704px] flex flex-col items-center gap-[32px]">
                <div className="w-full flex flex-col items-center justify-start gap-[8px] ">
                    <div>
                        <div className="flex gap-[8px] items-center justify-center">
                            <img src="src/assets/icons/styleLogo.svg" alt="Logo" />
                                
                            
                            <div className="flex">
                                <span className="text-black font-bold text-[1.5rem]">
                                    STYLE
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="items-center text-tertiary">   
                        <span>Welcome back to your account</span>
                    </div>

                </div>

                <div className="w-full flex flex-col items-center justify-start shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)] rounded-[12px]">
                    <div className="w-full flex flex-col items-start justify-start p-[24px]">
                        <div className="w-full flex flex-col items-center ">
                            <h1 className="text-[1.5rem] h-[32px] font-bold">
                                Sign In
                            </h1>

                            <div className="pt-[4px] flex flex-col items-center justify-center">
                                <span className="text-tertiary text-center text-[16px]">Enter your credentials to access your account</span>
                            </div>
                                
                            <div className="">
                                <div className="gap-[12px]">
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[24px] w-full pb-[24px] pl-[24px] pr-[24px]">
                        <div className="w-full  gap-[12px] flex flex-col items-center justify-center">
                            <ButtonIntegration icone="src/assets/icons/googleLogo.svg" texto="Continue with Google" onClick={() => loginWithGoogle()} />
                            
                            <FacebookLogin
                                appId="1545019629889517"
                                fields="first_name,last_name,email,picture"
                                onProfileSuccess={loginWithFacebook}
                                render={({onClick}) => (
                                    <ButtonIntegration icone="src/assets/icons/facebookLogo.svg" texto="Continue with Facebook" onClick={onClick} />
                                )}/>
                            

                        </div>

                        <div className="w-full relative flex items-center justify-center gap-[12px]">

                            <div className="absolute flex items-center w-full  z-1">
                                <hr className="w-full border-t border-gray-300" />
                            </div>

                            <div className="z-0 pr-[8px] pl-[8px] z-10 bg-white items-center justify-center flex">
                                <span className="text-tertiary text-[12px] ">OR CONTINUE WITH EMAIL</span>
                            </div>
                            
                        </div>
                        <InputText icone="./src/assets/icons/emailIcon.svg" texto="Enter your email" isPassword={false} label="Email Address"/>
                        <div className="relative flex items-end w-full">
                            <InputText icone="./src/assets/icons/passwordIcon.svg" texto="Enter your password" isPassword={true} label="Password"/>    
                        <Link className="absolute right-0 top-0 text-[12px] text-[14px] hover:underline text-primary" to="/forgot-password">Forgot Password?</Link>
                        </div>

                        <Button texto="Sign In" link="/dashboard" color="default"/>
                        <span className="text-[14px] text-tertiary">Don't have an account? <Link to="/register" className="font-semibold text-primary hover:underline">Sign Up</Link></span>

                    </div>
                </div>
                    <span className="text-tertiary text-center text-[14px]">By signing in, you agree to our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary mr-[3.8px] hover:underline">Privacy Policy</Link></span>
                
                
                
                
            </div>



        </>
    )
}