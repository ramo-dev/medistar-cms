
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import Loading from "../loading"
import AddDoctor from "./addDoctor"

export default function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true)
      try {
        const resp = await fetch(`http://localhost:4000/doctors`);
        const data = await resp.json();
        setLoading(false);
        setDoctor(data);
      } catch (err) {
        setDoctor([]);
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [])


  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Our Doctors
      </h1>

      <div className="flex w-full gap-2">
        <div className="relative mb-4 flex-1">
          <Input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />

        </div>
        <AddDoctor />
      </div>
      <div className="flex flex-wrap gap-3 transition ease-in-out delay-150 duration-300">
        {loading ? <Loading /> : filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:bg-gray-50 min-w-[250px] flex-1 min-h-[200px]  transition ease-in-out delay-150 duration-300">
            <CardHeader >
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm text-gray-600">{doctor.phone}</p>
            </CardHeader>
            <CardFooter className="">
              <Link href={`/dashboard/doctors/${encodeURIComponent(doctor.id)}`} passHref>
                <Button className="">
                  View Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))
        }

      </div >


    </div >
  )
}
