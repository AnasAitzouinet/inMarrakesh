"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
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
import { AddActivityDialog } from "./ActivityForm"

// This would typically come from a database
const activities = [
    { 
        id: "1", 
        title: "City Tour", 
        subtitle: "Explore Paris", 
        pricePrivate: "50", 
        priceShuttle: "40", 
        image: "https://example.com/city-tour.jpg",
        overview: "A comprehensive tour of Paris",
        includes: "Guide, transportation",
        excludes: "Meals, entrance fees",
        itinerary: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"]
    },
    { 
        id: "2", 
        title: "Museum Visit", 
        subtitle: "Discover Art", 
        pricePrivate: "30", 
        priceShuttle: "25", 
        image: "https://example.com/museum.jpg",
        overview: "Visit to the famous art museum",
        includes: "Entrance fee, audio guide",
        excludes: "Transportation",
        itinerary: ["Main Gallery", "Modern Art Wing", "Sculpture Garden"]
    }
]

export default function ActivitiesPage() {
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Activities</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="p-4 pt-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Activities</h1>
                    <AddActivityDialog />
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
                        {activities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell>{activity.title}</TableCell>
                                <TableCell>{activity.subtitle}</TableCell>
                                <TableCell>${activity.pricePrivate}</TableCell>
                                <TableCell>${activity.priceShuttle}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            <>
                                                <Pencil className="h-4 w-4 mr-1" />
                                                Edit
                                            </>
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
