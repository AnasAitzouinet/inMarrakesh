import React from 'react'
import ReservationsPage from './Reservations'
import { GetReservations } from '@/server/Admin'

export default async function Page() {

    const fetchedReservations = await GetReservations()

    if (!fetchedReservations?.data) {
        return null
    }

  return (
    <ReservationsPage reservations={fetchedReservations.data} />
  )
}
