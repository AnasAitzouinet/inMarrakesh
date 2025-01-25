import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {

    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Badge } from '@/components/ui/badge'
import { Bell, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Admin() {
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
                            <Badge>+20%</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">+180 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Reservations</CardTitle>
                            <Badge variant="secondary">Today</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">23</div>
                            <p className="text-xs text-muted-foreground">+4 since yesterday</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">89</div>
                            <p className="text-xs text-muted-foreground">Across 12 destinations</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Contact Form Entries</CardTitle>
                            <Badge variant="destructive">3 New</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18</div>
                            <p className="text-xs text-muted-foreground">This week</p>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div className="ml-2 space-y-1">
                                    <p className="text-sm font-medium leading-none">New contact form submission</p>
                                    <p className="text-sm text-muted-foreground">John Doe inquired about Bali trip package</p>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                    View
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center">
                                <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div className="ml-2 space-y-1">
                                    <p className="text-sm font-medium leading-none">New reservation alert</p>
                                    <p className="text-sm text-muted-foreground">2 new reservations for Paris tour</p>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                    View
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center">
                                <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div className="ml-2 space-y-1">
                                    <p className="text-sm font-medium leading-none">User feedback received</p>
                                    <p className="text-sm text-muted-foreground">5-star rating for Rome adventure package</p>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                    View
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
