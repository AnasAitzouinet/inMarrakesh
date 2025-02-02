import { GetActivities, GetTrips } from '@/server/Admin'
import React from 'react'
import Destinations from './Destinations'

export default async function Page() {
    const trips = await GetTrips()
    const activities = await GetActivities()

    console.log(trips)
    if (!trips?.data || !activities?.data) {
        return <div>
          No Destinations Found
        </div>
    }

  return (
    <Destinations tripList={trips.data} activitiesList={activities.data}/>
  )
}
