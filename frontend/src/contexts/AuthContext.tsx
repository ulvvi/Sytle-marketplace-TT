import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';

// 1. Definimos o tipo de dado do Usuário
interface User {
  firstName: string
  lastName: string
  email: string;
  picture?: string;
}

// 2. Definimos o que vai ter dentro do nosso Contexto (o "cofre")
interface AuthContextType {
  user: User | null;
  signIn: (userData: User) => void;
  signOut: () => void;
}

// Criamos o Contexto vazio
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Criamos o Provedor (O componente que guarda os dados)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Tenta buscar o texto salvo no navegador
    const userStorage = localStorage.getItem('usuario_logado');
    
    if (userStorage) {
      // Se achou, converte de Texto para Objeto e coloca no Estado
      setUser(JSON.parse(userStorage));
    }
  }, []);

  // Função para logar (salvar os dados)
  const signIn = (userData: User) => {
    setUser(userData);

    localStorage.setItem('usuario_logado', JSON.stringify(userData));
  };
  const signOut = () => {
    setUser(null);
    // 3. Ao deslogar, limpamos o "HD"
    localStorage.removeItem('usuario_logado');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Criamos um atalho (Hook) para facilitar o uso nos outros arquivos
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}