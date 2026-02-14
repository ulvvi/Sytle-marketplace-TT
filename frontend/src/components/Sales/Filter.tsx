import filterIcon from "../../assets/icons/filterIcon.svg"
import { CheckBox } from "../Checkbox"


export function Filter(){
    const categories = ["Tops", "Bottoms", "Dresses", "Shoes", "Acessories"];
    const sizes = ["XS","S", "M", "L", "XL", "6", "7", "8", "9", "10", "11", "28", "30", "32", "34", "36"];
    return(
        <div className="flex flex-col gap-5 w-1/4 max-w-64">
            <div className="flex lg:hidden">
                <img src={filterIcon} alt="ícone de filtro" />
                <p className="font-semibold">Filters</p>
            </div>

            <ul className="flex flex-col gap-y-1 lg:pt-6">
                <legend className="font-semibold py-1">Category</legend>
                {categories.map((category) => (
                    <li><CheckBox label = {category}/></li>
                ))}
            </ul>
            <ul>
                <legend className="font-semibold py-1">Size</legend>
                <div className="grid grid-cols-3 gap-x-3 gap-y- self-stretch ">
                    
                    {sizes.map((size) => (
                        <li><CheckBox label = {size}/></li>
                    ))}
                </div>
            </ul>

            <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Price Range</h3>
                <select name="" id="" className="rounded-xl border border-(--border-primary)  text-[0.875rem] py-1 px-2 w-full" >
                    <option selected value="Opcao1" >All prices</option>
                    <option value="Opcao1">Opcao1</option>
                    <option value="Opcao1">Opcao1</option>
                </select>
            </div>
            

        </div>
    )
}