import {createContext } from "react";
export type productInfo = {
    name: string,
    rating: number,
    price: number,
    salePrice: number,
    numOfReviews: number,
    isOutOfStock: boolean,
}

export type variantInfo ={
    color: string,
    size: number,
    stock: number,
    product: productInfo
}

export type orderVariantInfo = {
    variant: variantInfo
    quantity: number
}

export type orderInfo = {
    id: number,
    time: Date,
    address: string,
    rastreio: string,
    situation: "DELIVERED" | "SHIPPED" | "PROCESSING",
    totalPrice: number
    variants: orderVariantInfo[]
}

export type userInfo = {
    firstName: string,
    lastName: string,
    email: string,
    gender?: "FEMALE" | "MALE" | "OTHER",
    phoneNumber?: string,
    dateBirth?: Date,
    totalOrders: number,
    totalRating: number,
    totalWishlist: number,
    emailNotification: boolean,
    smsNotification: boolean,
    marketingEmail: boolean,
    orderUpdate: boolean,
    newArrival: boolean,
    saleAlert: boolean,
    memberSince: Date
}


export const userContext = createContext<userInfo | undefined >(undefined);