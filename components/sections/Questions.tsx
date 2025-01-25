import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Question() {
    return (
        <Accordion type="single" collapsible className="w-2/4  text-3xl">
            <AccordionItem value="item-1">
                <AccordionTrigger>What services do you provide?</AccordionTrigger>
                <AccordionContent>
                    We offer comprehensive travel services including transport, guided tours, activity planning, and accommodation arrangements. We ensure you have everything you need for an unforgettable experience in Morocco.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>How does your AI technology enhance my travel experience?
                </AccordionTrigger>
                <AccordionContent>
                    Our AI technology personalizes your itinerary, provides real-time updates, and streamlines bookings and services. This ensures a seamless and customized travel experience, tailored to your preferences.

                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Why should I choose your agency over others?</AccordionTrigger>
                <AccordionContent>
                    With a legacy of exceptional service, top-tier feedback, and celebrity endorsements, we stand out by offering innovative solutions and a commitment to excellence. Our integration of AI technology further distinguishes us by providing a unique, efficient, and personalized travel experience.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>What makes your agency's service unique?
                </AccordionTrigger>
                <AccordionContent>
                    We combine two decades of expertise with modern technology to offer a superior travel experience. Our team is dedicated to handling every aspect of your journey, from planning to execution, ensuring a smooth and enjoyable adventure.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger className="text-start">Can you accommodate special requests or custom itineraries?</AccordionTrigger>
                <AccordionContent>
                Absolutely! We pride ourselves on our flexibility and ability to customize your travel plans to fit your specific needs and desires. Let us know your preferences, and we&apos;ll craft the perfect itinerary for you.                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
