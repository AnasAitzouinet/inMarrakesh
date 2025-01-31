"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
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
 
import { AddTripDialog } from "./TripForm"
// This would typically come from a database
const trips = [
    { 
        id: "clxyz12340001", 
        title: "Paris Getaway", 
        subtitle: "Romantic Escape", 
        pricePrivate: "1200", 
        priceShuttle: "1000", 
        image: "paris.jpg", 
        overview: "Experience the romance of Paris...", 
        includes: "Accommodation, Breakfast", 
        excludes: "Airfare, Lunch", 
        itinerary: ["Day 1: Arrival", "Day 2: Eiffel Tower Tour"], 
        createdAt: new Date(), 
        updatedAt: new Date() 
    },
    { 
        id: "clxyz12340002", 
        title: "Tokyo Adventure", 
        subtitle: "Urban Exploration", 
        pricePrivate: "2500", 
        priceShuttle: "2200", 
        image: "tokyo.jpg", 
        overview: "Discover the vibrant city of Tokyo...", 
        includes: "Accommodation, Guided Tours", 
        excludes: "Meals, Transportation", 
        itinerary: ["Day 1: Arrival", "Day 2: Shibuya Crossing"], 
        createdAt: new Date(), 
        updatedAt: new Date() 
    },
]

export default function TripsPage() {
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Trips</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="p-4 pt-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Trips</h1>
                    <AddTripDialog />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Subtitle</TableHead>
                            <TableHead>Private Price</TableHead>
                            <TableHead>Shuttle Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trips.map((trip) => (
                            <TableRow key={trip.id}>
                                <TableCell>{trip.title}</TableCell>
                                <TableCell>{trip.subtitle}</TableCell>
                                <TableCell>${trip.pricePrivate}</TableCell>
                                <TableCell>${trip.priceShuttle}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/trips/${trip.id}/edit`}>
                                                <Pencil className="h-4 w-4 mr-1" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <Trash className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
