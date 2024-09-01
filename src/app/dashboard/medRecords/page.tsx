
"use client";
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import AddRecord from './newRecord';

export default function MedicalRecordsComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientData, setPatientData] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(`http://localhost:4000/patients`);
        if (!resp.ok) throw new Error('Failed to fetch data');
        const data = await resp.json();
        console.log(data);
        setPatientData(data);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setPatientData([]); // Set an empty array to handle the error gracefully
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = patientData.filter(record =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [patientData, searchTerm]); // Include searchTerm in dependencies

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patient Medical Records</CardTitle>
        <div className="flex justify-between items-center mt-4 gap-2">
          <div className="relative w-64 flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <AddRecord />
        </div>
      </CardHeader>
      <CardContent>
        {filteredRecords.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Phone</TableHead>
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
                  <TableCell>{record.phone}</TableCell>
                  <TableCell>{record.chronicConditions[0]}</TableCell>
                  <TableCell>{record.doctor}</TableCell>

                  <TableCell>
                    <Link href={`/dashboard/medRecords/${record.id}`}>
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
        ) : (
          <p>No records found</p>
        )}
      </CardContent>
    </Card>
  );
}
