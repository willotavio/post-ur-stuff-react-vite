import React from "react"
import { SideBar } from "../components/sideBar/SideBar"

type TProps = {
    children: React.ReactNode
}

export const MainLayout = ({ children }: TProps) => {
    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-1">
                <SideBar />
            </div>
            <div className="col-span-2">
                { children }
            </div>
        </div>
    )
}