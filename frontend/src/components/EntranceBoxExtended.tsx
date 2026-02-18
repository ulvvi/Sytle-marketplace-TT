import { ButtonIntegration } from "./ButtonIntegration"
import { InputText } from "./InputText"
import { Link, useNavigate } from "react-router"
import { Button } from "./Button"
import { useAuth } from '../contexts/AuthContext'
import { useGoogleLogin } from "@react-oauth/google"
import FacebookLogin from '@greatsumini/react-facebook-login';
import axios from 'axios'
import { useState, type ChangeEvent } from "react"

interface SignUpFormData {
    firstName: string
    lastName: string
    email: string
    password?: string
    confirmPassword?: string
    terms: boolean
    notifications?: boolean
}

interface UserPayload {
    firstName: string
    lastName: string
    email: string;
    password?: string | null;
    avatarUrl?: string | null;
    provider: 'google' | 'facebook' | 'credentials';
}

export function EntranceBoxExtended() {

    const navigate = useNavigate(); // Hook de navegação

    const saveUserToBackend = async (payload: UserPayload) => {
    try {
        console.log("Enviando dados...", payload); // Para você ver o que está indo

        const response = await axios.post('http://localhost:5173/signUp', payload);
        
        console.log("SUCESSO! Resposta do Backend:", response.data);
        alert("Usuário criado! Olhe o console ou o banco."); 

    } catch (error) {
        // Se der erro, vai aparecer vermelho no console do navegador (F12)
        console.error("ERRO AO CRIAR:", error);
    }
};

    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
        notifications: false
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
        let newErrors = {};

        // Validação básica de senha
        if (formData.password && formData.password !== formData.confirmPassword) {
            newErrors = { ...newErrors, confirmPassword: "As senhas não coincidem." };
            hasError = true;
            window.alert("senhas diferentes")
        }

        if (!formData.terms) {
            newErrors = { ...newErrors, terms: "Você precisa aceitar os termos para continuar." };
            hasError = true;
            window.alert("termos precisam ser assinados")
        }

        const payload: UserPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            provider: 'credentials',
            avatarUrl: null
        };

        await saveUserToBackend(payload);
    };

    return (
        <>
            <div className="max-w-[448px] h-[748px] md:h-[704px] flex flex-col items-center gap-[32px]">
                <div className="w-full flex flex-col items-center justify-start gap-[8px] ">
                    <div>
                        <div className="flex gap-[8px] items-center justify-center">
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

                <div className="w-full flex flex-col items-center justify-start shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)] rounded-[12px]">
                    <div className="w-full flex flex-col items-start justify-start p-[24px]">
                        <div className="w-full flex flex-col items-center ">
                            <h1 className="text-[1.5rem] h-[32px] font-bold">Create Account</h1>
                            <div className="pt-[4px] flex flex-col items-center justify-center">
                                <span className="text-tertiary text-center text-[16px]">Join our community and discover amazing fashion</span>
                            </div>
                        </div>
                    </div>

                    
                    <form 
                        onSubmit={handleSubmit} 
                        className="flex flex-col items-center justify-center gap-[24px] w-full pb-[24px] pl-[24px] pr-[24px]"
                    >
                        
                        
                        <div className="w-full gap-[12px] flex flex-col items-center justify-center">
                            
                            <ButtonIntegration icone="src/assets/icons/googleLogo.svg" texto="Continue with Google"/>
                            <ButtonIntegration icone="src/assets/icons/facebookLogo.svg" texto="Continue with Facebook" />
                        </div>

                        <div className="z-0 w-full relative flex items-center justify-center gap-[12px]">
                            <div className="absolute flex items-center w-full z-1">
                                <hr className="w-full border-t border-gray-300" />
                            </div>
                            <div className="pr-[8px] pl-[8px] z-10 bg-white items-center justify-center flex">
                                <span className="text-tertiary text-[12px] ">OR CONTINUE WITH EMAIL</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-[16px] w-full">
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

                        <div className="relative flex flex-col items-start w-full gap-[8px]">
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

                        <div className="flex flex-col gap-[12px] w-full items-start">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="checkbox" 
                                        name="terms"
                                        checked={formData.terms}
                                        onChange={handleChange}
                                        className="peer appearance-none h-[16px] w-[16px] border-2 border-primary rounded-full checked:bg-primary transition-all cursor-pointer" 
                                    />
                                    <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="ml-[8px] text-[14px] text-primary font-semibold">
                                    I agree to the <Link to="/register" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link to="/register" className="font-semibold text-primary hover:underline">Privacy Policy</Link>
                                </span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="checkbox" 
                                        name="notifications"
                                        checked={formData.notifications}
                                        onChange={handleChange}
                                        className="peer appearance-none h-[16px] w-[16px] border-2 border-primary rounded-full checked:bg-primary transition-all cursor-pointer" 
                                    />
                                    <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="ml-[8px] text-[14px] text-primary font-semibold">Subscribe to our newsletter for exclusive offers and updates</span>
                            </label>
                            
                        </div>

                            <Button texto="Create Account" color="default" onClick={handleSubmit} />
                        
                        <span className="text-[14px] text-tertiary">Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign In</Link></span>

                    </form>
                </div>
            </div>

            <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-xs z-50 opacity-90">
    <h3 className="font-bold mb-2 text-yellow-400">Estado Atual (Raio-X):</h3>
    <pre>{JSON.stringify(formData, null, 2)}</pre>
</div>
        </>
    )
}