"use server";
import React from 'react'
import ActivitiesPage from './Activities';
import { GetActivities } from '@/server/Admin';
 
export default async function Page() {

    let activities = await GetActivities()

    if (!activities?.data) {
        return null
    }

    return (
        <ActivitiesPage activities={activities.data} />
    )
}
