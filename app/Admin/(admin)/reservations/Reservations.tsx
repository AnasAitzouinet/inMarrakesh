"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Prisma } from "@prisma/client"

type Reservation = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateTo: Date;
  adults: number;
  kids: number;
  isPaid: boolean;
  isPickup: boolean;
  pickUpPlace: string | null;
  status: string;
}
 

type ReservationData = Prisma.ReservationsGetPayload<({
    include: {
        Trips: true,
        Activities: true
    }
})>
interface ReservationsProps {
    reservations: ReservationData[];
}

export default function ReservationsPage({ reservations }: ReservationsProps) {
    const [selectedReservation, setSelectedReservation] = useState<ReservationData | null>(null)

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Reservations</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="p-4 pt-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Reservations</h1>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                                <TableCell>{reservation.name}</TableCell>
                                <TableCell>{reservation.email}</TableCell>
                                <TableCell>{reservation.phoneNumber}</TableCell>
                                <TableCell>{reservation.dateTo?.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                        reservation.status === 'confirmed' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {reservation.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => setSelectedReservation(reservation)}
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={!!selectedReservation} onOpenChange={(open) => !open && setSelectedReservation(null)}>
                    <DialogContent className="max-w-2xl">
                        {selectedReservation && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Reservation Details</DialogTitle>
                                    <DialogDescription>
                                        Detailed information for {selectedReservation.name}'s reservation
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-lg mb-2">Contact Information</h3>
                                        <div className="space-y-1">
                                            <p><span className="font-medium">Name:</span> {selectedReservation.name}</p>
                                            <p><span className="font-medium">Email:</span> {selectedReservation.email}</p>
                                            <p><span className="font-medium">Phone:</span> {selectedReservation.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-lg mb-2">Reservation Details</h3>
                                        <div className="space-y-1">
                                            <p><span className="font-medium">Date:</span> {selectedReservation.dateTo?.toLocaleDateString()}</p>
                                            <p><span className="font-medium">Adults:</span> {selectedReservation.adults}</p>
                                            <p><span className="font-medium">Kids:</span> {selectedReservation.kids}</p>
                                            <p><span className="font-medium">Status:</span> 
                                                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                                                    selectedReservation.status === 'confirmed' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {selectedReservation.status}
                                                </span>
                                            </p>
                                            <p><span className="font-medium">Payment:</span> 
                                                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                                                    selectedReservation.isPaid 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {selectedReservation.isPaid ? "Paid" : "Pending"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    {selectedReservation.isPickup && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-lg mb-2">Pickup Information</h3>
                                            <p><span className="font-medium">Pickup Location:</span> {selectedReservation.pickUpPlace}</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
