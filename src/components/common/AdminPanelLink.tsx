"use client"
import { getUserRole } from "@/actions/authActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

function AdminPanelLink() {

    const [userRole, setUserRole] = useState<"USER" | "ADMIN" | "OWNER">('USER')

    useEffect(() => {
        getUserRole().then(userRole => {            
            setUserRole(userRole)
        })
    }, [])


    if (userRole == 'USER') {
        return ''
    }

    return (
        <Link href={'/p-admin'} className="border border-secondary rounded-full transition-colors duration-300 hover:border-main bg-bgColer fixed p-3 bottom-20 lg:bottom-3 left-2 md:left-4 flex justify-center items-center z-30">
            <MdOutlineAdminPanelSettings size={20} className="text-main" />
        </Link>
    )
}

export default AdminPanelLink;
