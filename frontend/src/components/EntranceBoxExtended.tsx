import { ButtonIntegration } from "./ButtonIntegration"
import { InputText } from "./InputText"
import { Link, useNavigate } from "react-router"
import { Button } from "./Button"
import { useAuth, type UserPayload } from '../contexts/AuthContext' // Puxando a interface e o hook do Contexto
import { useGoogleLogin } from "@react-oauth/google"
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useState, type ChangeEvent } from "react"
import axios from "axios"

interface SignUpFormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword?: string
    terms: boolean
    marketingEmail?: boolean
}

export function EntranceBoxExtended() {
    const navigate = useNavigate(); 
    
    //Puxando a função do Contexto
    const { signUp } = useAuth(); 

    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
        marketingEmail: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        let finalValue: string | boolean = value;
        
        if ((e.target as HTMLInputElement).type === 'checkbox') {
            finalValue = (e.target as HTMLInputElement).checked;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: finalValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let hasError = false;

        // Validação das senhas
        if (formData.password && formData.password !== formData.confirmPassword) {
            hasError = true;
            window.alert("As senhas não coincidem.");
        }

        // Validação dos termos
        if (!formData.terms) {
            hasError = true;
            window.alert("Os termos precisam ser aceitos.");
        }

        // se tiver erro o programa para na hora
        if (hasError) {
            return; 
        }

        // Se chegou aq é porque ele passou pelas validações
        const payload: UserPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password as string,
            marketingEmail: formData.marketingEmail as boolean
        };

        try {
            await signUp(payload); // essa função tá no contexto
            console.log("Usuário criado");
            navigate('/signIn');
        } catch (error : any) {
            window.alert(error.message);
        }
    };

    const { signIn } = useAuth();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const dados = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );
                
                const emailGoogle = dados.data.email;
                const senhaGoogle = "Google_1234_abc!@#";

                try {
                    await signIn({
                        email: emailGoogle,
                        password: senhaGoogle
                    });
                
                    window.alert("Conectado");
                    navigate('/'); 
                    return; 

                } catch (erroLogin) {
                    
                    try {
                        await signUp({
                            firstName: dados.data.given_name || "Usuário",
                            lastName: dados.data.family_name || "",
                            email: emailGoogle,
                            password: senhaGoogle, 
                            marketingEmail: false 
                        });

                        await signIn({
                            email: emailGoogle,
                            password: senhaGoogle
                        });

                        window.alert("Conta Google criada");
                        navigate('/');

                    } catch (erroCadastro: any) {
                        window.alert(erroCadastro.message || "Erro ao criar conta Google");
                    }
                }

            } catch (error: any) {
                window.alert(error.message || "Erro ao conectar com Google");
            }
        },
        onError: () => console.log("Erro no login do Google")
    });

    const loginWithFacebook = async (response: any) => {
        try {
            const emailFace = response.email;
            const senhaFace = "Facebook_1234_abc!@#"; 
            try {
                await signIn({
                    email: emailFace,
                    password: senhaFace
                });
                
                window.alert("Conectado");
                navigate('/');
                return; 

            } catch (erroLogin) {
                try {
                    await signUp({
                        firstName: response.first_name || "Usuário", 
                        lastName: response.last_name || "",
                        email: emailFace,
                        password: senhaFace, 
                        marketingEmail: false
                    });

                    
                    await signIn({
                        email: emailFace,
                        password: senhaFace
                    });
                    
                    window.alert("Conta Facebook criada");
                    navigate('/');

                } catch (erroCadastro: any) {
                    window.alert(erroCadastro.message || "Erro ao criar conta com Facebook");
                }
            }

        } catch (error: any) {
             window.alert(error.message || "Erro geral ao conectar com Facebook");
        }
    };

  
    return (
        <>
            <div className="max-w-md h-187 md:h-176 flex flex-col items-center gap-8">
                <div className="w-full flex flex-col items-center justify-start gap-2 ">
                    <div>
                        <div className="flex gap-2 items-center justify-center">
                            <img src="src/assets/icons/styleLogo.svg" alt="Logo" />
                            <div className="flex">
                                <span className="text-black font-bold text-[1.5rem]">STYLE</span>
                            </div>
                        </div>
                    </div>
                    <div className="items-center text-tertiary">
                        <span>Create your account and start shopping</span>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center justify-start shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)] rounded-xl">
                    <div className="w-full flex flex-col items-start justify-start p-6">
                        <div className="w-full flex flex-col items-center ">
                            <h1 className="text-[1.5rem] h-8 font-bold">Create Account</h1>
                            <div className="pt-1 flex flex-col items-center justify-center">
                                <span className="text-tertiary text-center text-[16px]">Join our community and discover amazing fashion</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex flex-col items-center justify-center gap-6 w-full pb-6 pl-6 pr-6">

    <div className="w-full gap-3 flex flex-col items-center justify-center">
        <ButtonIntegration icone="src/assets/icons/googleLogo.svg" texto="Continue with Google" onClick={() => loginWithGoogle()} />
                            
        <FacebookLogin
            appId="1545019629889517"
            fields="first_name,last_name,email,picture"
            onProfileSuccess={loginWithFacebook}
            render={({onClick}) => (
                <ButtonIntegration icone="src/assets/icons/facebookLogo.svg" texto="Continue with Facebook" onClick={onClick} />
            )}/>
    </div>

    <div className="z-0 w-full relative flex items-center justify-center gap-3">
        <div className="absolute flex items-center w-full z-1">
            <hr className="w-full border-t border-gray-300" />
        </div>
        <div className="pr-2 pl-2 z-10 bg-white items-center justify-center flex">
            <span className="text-tertiary text-[12px] ">OR CONTINUE WITH EMAIL</span>
        </div>
    </div>
    
    <form 
        onSubmit={handleSubmit} 
        className="flex flex-col w-full gap-6"
    >
        <div className="flex gap-4 w-full">
            <InputText 
                icone="./src/assets/icons/userIcon.svg" 
                texto="First Name" 
                isPassword={false} 
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            <InputText 
                texto="Last Name" 
                isPassword={false} 
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
        </div>

        <InputText 
            icone="./src/assets/icons/emailIcon.svg" 
            texto="Enter your Email" 
            isPassword={false} 
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />

        <div className="relative flex flex-col items-start w-full gap-2">
            <InputText 
                icone="./src/assets/icons/passwordIcon.svg" 
                texto="Create a password" 
                isPassword={true} 
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <span className="text-[12px] text-tertiary">Must be at least 8 characters long</span>
        </div>

        <InputText 
            icone="./src/assets/icons/passwordIcon.svg" 
            texto="Confirm your password" 
            isPassword={true} 
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword || ''}
            onChange={handleChange}
        />

        <div className="flex flex-col gap-3 w-full items-start">
            <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative flex items-center justify-center">
                    <input 
                        type="checkbox" 
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="peer appearance-none h-4 w-4 border-2 border-primary rounded-full checked:bg-primary transition-all cursor-pointer" 
                    />
                    <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span className="ml-2 text-[14px] text-primary font-semibold">
                    I agree to the <Link to="/register" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link to="/register" className="font-semibold text-primary hover:underline">Privacy Policy</Link>
                </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative flex items-center justify-center">
                    <input 
                        type="checkbox" 
                        name="marketingEmail"
                        checked={formData.marketingEmail}
                        onChange={handleChange}
                        className="peer appearance-none h-4 w-4 border-2 border-primary rounded-full checked:bg-primary transition-all cursor-pointer" 
                    />
                    <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span className="ml-2 text-[14px] text-primary font-semibold">Subscribe to our newsletter for exclusive offers and updates</span>
            </label>
        </div>

        <Button texto="Create Account" color="default" onClick={handleSubmit} />

    </form>
    
    <span className="text-[14px] text-tertiary">Already have an account? <Link to="/signIn" className="font-semibold text-primary hover:underline">Sign In</Link></span>

</div>
                </div>
            </div>
        </>
    )
}