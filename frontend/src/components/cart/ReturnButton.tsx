import blackArrowIcon from "../../assets/icons/blackArrowIcon.svg";
import { useCart } from "./cartContext"; // Importe o hook

interface ReturnButtonProps {
    text: string;
    link: string;
    isCart: boolean;
};

const ReturnButton = ({text, link, isCart} : ReturnButtonProps) => {
    const { totalAvailableItems } = useCart(); // Pegue o valor global
    return(
        <>


            <div className="flex flex-row w-full h-16 items-center m-4 md:px-35 gap-4 md:gap-5"> {/* "md:" é a forma mais simples do @media, que por padrão, é ativado quando uma tela tem mais de 768 px ou mais*/}
                <a href={link}><img src={blackArrowIcon} alt="White Arrow" className="rotate-180 size-5 hover:bg-gray-200 rounded-[5px]"/></a>
                <span className="font-black text-3xl md:text-3xl">{text}</span>

                {isCart && (
                    <div className="flex items-center justify-center h-5 bg-gray-300 border-none rounded-xl p-1">
                        <p className="text-black font-medium text-xs"> {totalAvailableItems} {totalAvailableItems === 1 ? 'item' : 'items'}</p>
                    </div>
                )}
            </div>


        </>
        
    )
}

export default ReturnButton;