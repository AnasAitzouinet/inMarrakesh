"use server"
import React from 'react'
import TripsPage from './Trips'
import { GetTrips } from '@/server/Admin'

export default async function Page() {

    const fetchedTrips = await GetTrips()

    if (!fetchedTrips?.data) {
        return null
    }

    return (
        <TripsPage
            trips={fetchedTrips.data}
        />

    )
}
