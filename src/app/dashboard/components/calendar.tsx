"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon } from "lucide-react"


export default function CalendarPrev() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date())


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <Button variant="default" size="icon" className="rounded-full"><CalendarIcon /></Button>
      </DialogTrigger>
      <DialogContent className="py-5 w-fit scale-[1.25] ">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Calendar className="text-4xl p-0"
          mode="single"
          selected={date}
          onSelect={setDate}

        />
      </DialogContent>
    </Dialog>
  )
}

