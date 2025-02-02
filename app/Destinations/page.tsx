import { GetActivities, GetTrips } from '@/server/Admin'
import React from 'react'
import Destinations from './Destinations'

export default async function Page() {
    const trips = await GetTrips()
    const activities = await GetActivities()

    if (!trips?.data || !activities?.data) {
        return null
    }

  return (
    <Destinations tripList={trips.data} activitiesList={activities.data}/>
  )
}
