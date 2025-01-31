"use server"

import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
   
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'



interface LayoutProps {
  children: React.ReactNode
}
export default async function Layout({ children }: LayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // check if there is a session 
  if (!session) {
    redirect("/auth")
  } else if (session && session.user?.role !== "admin") {
    redirect("/")
  }
  return (
    <SidebarProvider>
      <AppSidebar 
        user={session.user}
      />
      <SidebarInset>
       {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
