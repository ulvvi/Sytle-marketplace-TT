import {createContext } from "react";

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