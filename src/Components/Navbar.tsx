"use client"

import { useState, useEffect } from "react"
import {
    ClerkProvider,
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import { useAppContext } from "@/context/Context";

import Link from "next/link";

const li_style = 'hover:text-cyan-500 my-2'

export default function Navbar() {
    const [display, setDisplay] = useState<boolean>(true);
    const { currentUser, loggedIn } = useAppContext();

    const clearLocalStorage = () => {
        localStorage.clear();
        location.reload();
    }

    return (
        <div>
            <div className={`${!display ? 'w-32' : 'w-32 bg-zinc-700'} flex flex-col h-screen text-xl fixed text-white`}>
                <ul className="flex flex-col p-2">
                    <li onClick={() => setDisplay(!display)}><i className="fa-solid fa-bars hover:text-cyan-500 mb-2"></i></li>
                    {display &&
                        <>
                            <li className={li_style}>
                                <SignedIn>
                                    <div className="flex flex-row">
                                        <h1>{currentUser}</h1>
                                        <UserButton />
                                    </div>
                                </SignedIn>
                            </li>
                            <li className={`${li_style} bg-zinc-600 p-2 rounded-xl`}>
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                                <SignedIn>
                                    <SignOutButton />
                                </SignedIn>
                            </li>
                            <li className={li_style}><Link href={"/"}>Home</Link></li>
                            <SignedIn><li className={li_style}><Link href={"/newpost"}>New Post</Link></li></SignedIn>
                            <SignedIn><li className={li_style}><Link href={"/accinfo"}>Account Settings</Link></li></SignedIn>
                            <li className={li_style} onClick={clearLocalStorage}>Clear Local Storage</li>
                        </>}
                </ul>
            </div>
        </div>
    )
}