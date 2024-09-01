
"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import AddPatient from './addPatient';

export default function MedicalRecordsComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientRecords, setPatientsRecords] = useState([]);


  useEffect(() => {
    async function fetchPatients() {
      try {
        const resp = await fetch(`http://localhost:4000/patients`);
        const data = await resp.json();
        setPatientsRecords(data);
      } catch (err) {
        setPatientsRecords([]);
      }
    }
    fetchPatients();
  }, [])



  // Filter records based on search term
  const filteredRecords = patientRecords.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Patient Admissions</CardTitle>
        <CardDescription>
          View the latest patients admitted to the hospital.
          <div className="flex justify-between items-center mt-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AddPatient />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.dob}</TableCell>
                <TableCell>{
                  record.visits[record.visits.length - 1].date
                }</TableCell>
                <TableCell>{record.chronicConditions[0]}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/patients/${record.id}`}>
                    <Button variant="outline" size="sm" className='hover:bg-primary/20'>
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
