import { ButtonIntegration } from "./ButtonIntegration"
import { InputText } from "./InputText"
import { Link, useNavigate } from "react-router" // 1. Adicionado useNavigate
import { Button } from "./Button"
import { useAuth } from '../contexts/AuthContext'
import { useGoogleLogin } from "@react-oauth/google"
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useState, type ChangeEvent } from "react" // 2. Adicionado ChangeEvent
import axios from 'axios'

interface UserData{
    name: string
    email: string
    picture: string
}

export function EntranceBox() {
    const navigate = useNavigate(); // Hook de navegação
    const { signIn } = useAuth();


    // --- 3. NOVA ESTRUTURA DO FORMULÁRIO MANUAL ---
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            window.alert("preencha o e-mail e a senha.");
            return;
        }

        try {
            await signIn({
                email: formData.email,
                password: formData.password
            });
            
            window.alert("Login passou");
            navigate('/');
            
        } catch (error: any) {
            window.alert(error.message);
        }
    };

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
            } as any); 

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
      } as any); // "as any" adicionado temporariamente
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
                        
                        {/* --- 4. FORMULÁRIO ENVOLVENDO OS INPUTS --- */}
                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[24px]">
                            
                            <InputText 
                                icone="./src/assets/icons/emailIcon.svg" 
                                texto="Enter your email" 
                                isPassword={false} 
                                label="Email Address"
                                name="email" // Conectando ao estado
                                value={formData.email} // Conectando ao estado
                                onChange={handleChange} // Conectando ao estado
                            />
                            
                            <div className="relative flex items-end w-full">
                                <InputText 
                                    icone="./src/assets/icons/passwordIcon.svg" 
                                    texto="Enter your password" 
                                    isPassword={true} 
                                    label="Password"
                                    name="password" // Conectando ao estado
                                    value={formData.password} // Conectando ao estado
                                    onChange={handleChange} // Conectando ao estado
                                />    
                                <Link className="absolute right-0 top-0 text-[12px] text-[14px] hover:underline text-primary" to="/forgot-password">Forgot Password?</Link>
                            </div>

                            {/* O onClick dispara o form, o link="/dashboard" foi removido pois a navegação agora é condicional */}
                            <Button texto="Sign In" color="default" onClick={handleSubmit} />

                        </form>
                        {/* ------------------------------------------- */}

                        <span className="text-[14px] text-tertiary">Don't have an account? <Link to="/register" className="font-semibold text-primary hover:underline">Sign Up</Link></span>

                    </div>
                </div>
                    <span className="text-tertiary text-center text-[14px]">By signing in, you agree to our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary mr-[3.8px] hover:underline">Privacy Policy</Link></span>
                
                
                
                
            </div>



        </>
    )
}