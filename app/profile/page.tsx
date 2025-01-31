"use server"
import React from 'react'
import UserProfile from './UserProfile'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Profile() {
  const data = await auth.api.getSession({
    headers: await headers()
  })
  if (!data || !data.user) {
    redirect("/auth")
  }
  return (
    <UserProfile 
      user={data.user}
    />
  )
}
