"use server"
import React from 'react'
import UserProfile from './UserProfile'
import { redirect } from 'next/navigation'
import { GetUser } from '@/server'

export default async function Profile() {
  const user = await GetUser()

  if (!user || !user.data) {
    redirect("/auth")
  }

  return (
    <UserProfile 
      user={user.data}
    />
  )
}
