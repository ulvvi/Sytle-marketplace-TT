import type {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

interface ButtonIntegrationProps {
    icone?: ReactNode;
    texto?: string;
    link?: string;
    }  

export function ButtonIntegration({
    icone = <div className="w-6 h-6 bg-gray-200 rounded-full" />,
    texto = "Clique aqui",
    link="/"}:ButtonIntegrationProps) {
    const navigate = useNavigate();

    const renderIcone = () => {
        if (typeof icone === 'string') {
            return <img src={icone} alt={texto} className="w-[16px] h-[16px]" />;
        }
        
        return icone;
    };

    return (
    <> 
        
        <button className="w-full h-[40px] flex items-center justify-center  cursor-pointer border-[1px] border-[#E5E7EB] rounded-[10px] border-solid hover:bg-gray-100" onClick={() => navigate(link)}>
            <div className="w-[24px] h-[16px] mr-2 flex items-center justify-center ">
                {renderIcone()}
            </div>
            <span className="text-black text-[0.875rem] font-medium font-semibold">{texto}</span>
        </button>
        
    </>
    );

}