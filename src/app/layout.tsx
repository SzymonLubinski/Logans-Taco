import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import Provider from "@/app/context/AuthContext";
import {Toaster} from "react-hot-toast";
import ToasterContext from "@/app/context/ToasterContext";

const inter = Inter({subsets: ['latin']})


export const metadata = {
    title: "Logan's Taco",
    description: 'welcome my friend!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Provider>
                <ToasterContext/>
                {children}
            </Provider>
            <div id='portal'/>
        </body>
        </html>
    )
}

