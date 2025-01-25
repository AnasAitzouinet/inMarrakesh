"use client"
import React from 'react'


import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { authClient } from '@/lib/auth-client'
 


interface LayoutProps {
    children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {

  const session = authClient.useSession()

  console.log(session)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
