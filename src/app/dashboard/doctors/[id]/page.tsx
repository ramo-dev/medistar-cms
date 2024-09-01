
"use client"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Phone, Trash } from "lucide-react"


export default function DoctorProfile({ params }) {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    async function fetchDoctors(id) {
      try {
        console.log("this params:", params)
        const resp = await fetch(`http://localhost:4000/doctors?id=${id}`);
        const data = await resp.json();
        console.log(data);
        setDoctor(data[0]);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setDoctor([]);
      }
    }

    if (params.id) {
      const url = Number(params.id);
      fetchDoctors(url);
    }
  }, [params.id])



  if (!doctor) {
    return <div className="w-full max-w-4xl mx-auto h-[80vh] flex justify-center" >
      <Card className="h-full my-auto border-none flex  items-center ">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Doctor Data not found
          </CardTitle>
        </CardHeader>
      </Card>
    </div >
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4 relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
              <AvatarFallback>{doctor.name}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{doctor.name}</CardTitle>
              <CardDescription>{doctor.specialty}</CardDescription>
            </div>
            <Button size="icon" variant="destructive" className="absolute right-0">
              <Trash />
            </Button>
          </div>

        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p><strong>Education:</strong> {doctor.education}</p>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <div className="flex items-center">
              <MapPin className="mr-2" size={16} />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" size={16} />
              <span>{doctor.phone}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span>{doctor.availableDays}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2" size={16} />
              <span>{doctor.availableHours}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Schedule Appointment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
