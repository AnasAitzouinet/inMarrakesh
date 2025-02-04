"use client"

import { useState } from "react"
import { Mail, Phone, Calendar, MapPin, Shield, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User } from "better-auth"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Prisma } from "@prisma/client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Mock data based on the schema
const userData = {
    id: "1",
    name: "Sarah Thompson",
    firstName: "Sarah",
    lastName: "Thompson",
    email: "sarah@travelscape.com",
    phone: "+1 (555) 123-4567",
    role: "user",
    avatar: null,
    emailVerified: true,
    reservations: [
        {
            id: "1",
            tripId: "trip1",
            activityId: null,
            dateTo: "2024-02-15",
            name: "Mountain Trek Adventure",
            adults: 2,
            kids: 0,
            isPaid: true,
            isPickup: true,
            pickUpPlace: "Hotel California",
            status: "confirmed",
        },
        {
            id: "2",
            tripId: "trip2",
            activityId: null,
            dateTo: "2024-03-20",
            name: "Beach Paradise Tour",
            adults: 1,
            kids: 2,
            isPaid: false,
            isPickup: false,
            pickUpPlace: null,
            status: "pending",
        },
    ],
}

interface UserProfileProps {
    user: Prisma.UserGetPayload<{
        include: {
            reservations: {
                include: {
                    Trips: true
                    Activities: true
                }
            }
        }
    }>
}

export default function UserProfile({ user }: UserProfileProps) {
    const [activeTab, setActiveTab] = useState("reservations")
    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut()
        router.push('/')
    }

    return (
        <div className="mx-auto bg-white min-h-screen">
            {/* Header */}
            <div className="relative h-48 bg-gradient-to-br from-purple-400 to-orange-400" />

            {/* Profile Info */}
            <div className="relative px-4 sm:px-6 lg:px-8 pb-6 max-w-7xl mx-auto">
                <div className="absolute -top-16 left-4 sm:left-6">

                    <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white rounded-2xl bg-gradient-to-br from-purple-400 to-orange-400 overflow-hidden">
                        <Image
                            width={96}
                            height={96}
                            src={user.image || ""} alt="" className="size-full object-cover" />
                    </div>
                </div>

                <div className="pt-16 sm:pt-20">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <h1 className="text-xl sm:text-2xl font-semibold">{user.name}</h1>
                        {user.emailVerified && (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 mt-2 sm:mt-0 w-fit">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                            </Badge>
                        )}

                        <Badge
                            onClick={handleLogout}
                            variant="secondary" className="bg-red-50 cursor-pointer 
                                hover:text-red-900 hover:bg-red-200 w-fit
                            text-red-700 mt-2 sm:mt-0">
                            <LogOut className="w-3 h-3 mr-1" />
                            Logout
                        </Badge>

                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm sm:text-base text-gray-500">
                            <Mail className="w-4 h-4 mr-2" />
                            {user.email}
                        </div>
                        <div className="flex items-center text-sm sm:text-base text-gray-500">
                            <Phone className="w-4 h-4 mr-2" />

                            {user.phone || "No phone number"}
                        </div>

                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex overflow-x-auto gap-4 sm:gap-6 mt-6 border-b">
                    {["Reservations", "Settings"].map((tab) => (
                        <button
                            key={tab}
                            className={`whitespace-nowrap pb-4 px-1 text-sm font-medium transition-colors ${activeTab === tab.toLowerCase()
                                ? "text-gray-900 border-b-2 border-gray-900"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Main Content */}
                <div className="mt-8 space-y-8">
                    {/* Upcoming Reservations */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Upcoming Reservations</h2>
                        <div className="space-y-4">
                            {userData.reservations.map((reservation) => (
                                <div key={reservation.id} className="p-4 rounded-xl border">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-medium">{reservation.name}</h3>
                                            <div className="mt-2 space-y-1">
                                                <div className=" flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {new Date(reservation.dateTo).toLocaleDateString()}
                                                </div>
                                                {reservation.isPickup && (
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <MapPin className="w-4 h-4 mr极-2" />
                                                        {reservation.pickUpPlace}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={reservation.isPaid ? "text-green-700" : "text-red-700"}>
                                            {reservation.isPaid ? "Paid" : "Pending Payment"}
                                        </Badge>
                                        <Badge
                                            variant={reservation.status === "confirmed" ? "default" : "secondary"}
                                            className={
                                                reservation.status === "confirmed"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                            }
                                        >
                                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                        </Badge>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
                                        <div>
                                            <span className="text-gray-500">Adults:</span> {reservation.adults}
                                            {reservation.kids > 0 && (
                                                <span className="ml-4">
                                                    <span className="text-gray-500">Kids:</span> {reservation.kids}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">

                                            <Button
                                                size={'sm'}
                                                variant="outline"
                                                className="text-red-700 rounded-full"

                                            >

                                                Cancel

                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
