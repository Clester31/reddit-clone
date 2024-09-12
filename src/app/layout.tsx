"use client"

import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Navbar from '../Components/Navbar'
import './globals.css';
import { AppProvider } from '@/context/Context';
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AppProvider>
        <html lang="en">
          <head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
            />
          </head>
          <body>
            <div className='flex'>
              <Navbar />
              <div className='flex-grow p-4 ml-32'>{children}</div>
            </div>
          </body>
        </html>
      </AppProvider>
    </ClerkProvider>
  );
}
