import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

export interface CartItemData {
    id: string;
    name: string;
    brand: string;
    size: string;
    color: string;
    price: number;
    image?: string;
    promotion?: number; // Em %
    inStock: boolean;
    quantity: number;
}

interface CartContextType {
  items: CartItemData[];
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void; // <-- Nova função
  totalAvailableItems: number;
  totalOutOfStockItems: number;
    subtotal: number;
    couponDiscountValue: number;
    total: number;
    discountPercent: number;
    applyCoupon: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemData[]>([
    { 
        id: "1", 
        name: "Premium Cotton T-Shirt",
        brand: "STYLE Premium",
        size: "M",
        color: "Red",
        price: 20,
        promotion: 20, // Em %
        inStock: true,
        quantity: 1 
    }, // T-Shirt

    { 
         id: "2", 
        name: "Designer Jeans",
        brand: "STYLE Premium",
        size: "32",
        color: "Back",
        price: 100,
        inStock: false,
        quantity: 1 
    }, // Jeans
  ]);

  const updateQuantity = (id: string, qty: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  // Lógica de remoção
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

    // Contador apenas para itens disponíveis (usado no Header e ReturnButton)
    const totalAvailableItems = items
        .filter(item => item.inStock)
        .reduce((acc, item) => acc + item.quantity, 0);

    // Contador apenas para itens fora de estoque (usado no título do Out of Stock)
    const totalOutOfStockItems = items
        .filter(item => !item.inStock)
        .length; 



  const [discountPercent, setDiscountPercent] = useState(0);

    // Cálculo do Subtotal (Apenas itens em estoque)
    const subtotal = items
        .filter(item => item.inStock)
        .reduce((acc, item) => {
        // Se o item tem promoção (ex: 20%), calculamos o preço unitário com desconto
        const priceWithPromotion = item.promotion 
        ? item.price * (1 - item.promotion / 100) 
        : item.price;
        return acc + (priceWithPromotion * item.quantity);
    }, 0);

    // Cálculo do Valor do Desconto do Cupom
    const couponDiscountValue = subtotal * (discountPercent / 100);

    // Total Final
    const total = subtotal - couponDiscountValue;

    // Função para aplicar o cupom (será usada no componente PromoCode)
    const applyCoupon = (code: string) => {
        const coupons: Record<string, number> = {
            "SALVE10": 10,
            "WELCOME20": 20,
            "STUDENTS15": 50
        };

        const discount = coupons[code.toUpperCase()];
        if (discount) {
            setDiscountPercent(discount);
            return true;
        }
        return false;
    };

  return (
    <CartContext.Provider value={{ items, updateQuantity, removeItem, totalAvailableItems, totalOutOfStockItems, subtotal, couponDiscountValue, total, discountPercent, applyCoupon}}>
      {children}
    </CartContext.Provider>
  );
  
}

export const useCart = () => useContext(CartContext)!;