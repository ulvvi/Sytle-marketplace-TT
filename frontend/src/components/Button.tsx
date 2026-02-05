interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    texto: string;
    link: string;
    color?: "default" | "white" | "red";
}

export function Button({ texto, link, color = "default", ...props }: ButtonProps) {
    return (
        <button 
            className={`w-full h-[40px] flex items-center justify-center  cursor-pointer border-[1px] border-(--border-primary) rounded-[10px] border-solid ${
                color === "default" ? "bg-[#030711]" : 
                color === "white" ? "bg-white text-black" : 
                "bg-red-500 text-white"
            }`}
            onClick={() => window.location.href = link}
            {...props}
            
        >
            <span className={`text-[0.875rem] font-semibold text-[14px] ${color === "white" ? "text-black" : "text-white"}`}>{texto}</span>
        </button>
    );
}