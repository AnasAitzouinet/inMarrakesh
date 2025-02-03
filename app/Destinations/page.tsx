import { GetActivities, GetTrips } from '@/server/Client'
import React from 'react'
import Destinations from './Destinations'

export default async function Page() {
    const [trips, activities] = await Promise.all([GetTrips(), GetActivities()])

    if (!trips?.data || !activities?.data) {
        return <div>
            No Destinations Found
        </div>
    }

    return (
        <Destinations tripList={trips.data} activitiesList={activities.data} />
    )
}
