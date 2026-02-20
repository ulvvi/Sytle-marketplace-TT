import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import axios from 'axios';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
}

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  marketingEmail: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => void;
  signUp: (payload: UserPayload) => Promise<void>; 
}

export interface SignInPayload {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const userStorage = localStorage.getItem('usuarioLogado');
    
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);


  const signIn = async (payload: SignInPayload) => {
    setIsLoading(true);
    try {
        const response = await axios.post('/signIn', payload); 
        const token = response.data.token;
        localStorage.setItem('styleToken', token);

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const tokenDecodificado = JSON.parse(decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')));
        
        const userId = tokenDecodificado.sub.id; 

        try {
            const userResponse = await axios.get(`/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const dadosReais = userResponse.data;
            setUser(dadosReais);
            localStorage.setItem('usuarioLogado', JSON.stringify(dadosReais));

        } catch (erroGet: any) {
            console.error("Erro obtido: ", erroGet.response?.data);
            throw new Error("Erro na validação do backend ao buscar usuário.");
        }

    } catch (error: any) {
        console.error("Erro geral:", error);
        throw new Error(error.message || "Erro desconhecido"); 
    } finally {
        setIsLoading(false);
    }
  };
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('usuarioLogado');
  };

  const signUp = async (payload: UserPayload) => {
    setIsLoading(true);
    try {
        const response = await axios.post('/signup', payload);
        
        return response.data

    } catch (error: any) {
        console.error("Erro ao criar conta no backend:", error);
        const backEndMessage = error.response?.data?.message || "";
          if (backEndMessage.includes("Unique") || backEndMessage.includes("email")){
            throw new Error("Email já existente"); 
          }
        throw new Error("Erro ao criar conta"); 
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}