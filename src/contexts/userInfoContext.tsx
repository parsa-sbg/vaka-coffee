"use client"

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

const userInfoContext = createContext<{ name: string, setName: Dispatch<SetStateAction<string>> }>({ name: '', setName: () => { } })

export const UserInfoContextProvider = ({ children }: PropsWithChildren) => {

    const [name, setName] = useState('')

    return (
        <userInfoContext.Provider value={{ name, setName }}>
            {children}
        </userInfoContext.Provider>
    )
}
export const useUserInfo = () => { return useContext(userInfoContext) } 
