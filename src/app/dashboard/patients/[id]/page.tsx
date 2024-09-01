
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import Loading from "../loading";


function Page({ params }) {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    console.log(params);
    async function fetchData(id) {
      try {
        const resp = await fetch(`http://localhost:4000/patients?id=${id}`);
        const data = await resp.json();
        console.log("Data", data);
        setPatientData(data[0]);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setPatientData(null);
      }
    }

    if (params.id) {
      fetchData(Number(params.id));
    }
  }, [params]);

  if (!patientData) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[80vh] flex justify-center">
        <Card className="h-full my-auto border-none flex  items-center ">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              No Patient Data Found
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold ">
          <User className="mr-2" />
          Patient Name : {patientData.name}

        </CardTitle>
      </CardHeader>
      <CardContent className="my-4">
        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-4 my-5">
            <TabsTrigger value="info">Basic Info</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </p>
                    <p>{patientData.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p>{patientData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Blood Type
                    </p>
                    <p>{patientData.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{patientData.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p>{patientData.address}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">
                      Emergency Contact
                    </p>
                    <p>{patientData.emergencyContact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medical">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Allergies</h3>
                  <ul className="list-disc pl-5">
                    {patientData.allergies && patientData.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Chronic Conditions
                  </h3>
                  <ul className="list-disc pl-5">
                    {patientData.chronicConditions && patientData.chronicConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="visits">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>

                      <TableHead>Doctor</TableHead>
                      <TableHead>Medication</TableHead>

                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientData.visits && patientData.visits.map((visit, index) => (
                      <TableRow key={index}>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>{visit.reason}</TableCell>
                        <TableCell>{visit.doctor}</TableCell>
                        <TableCell>{visit.medications}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medications">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientData.medications && patientData.medications.map((medication, index) => (
                      <TableRow key={index}>
                        <TableCell>{medication.name}</TableCell>
                        <TableCell>{medication.dosage}</TableCell>
                        <TableCell>{medication.frequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default Page;
