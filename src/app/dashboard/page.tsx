
import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Stethoscope, CalendarIcon, MegaphoneIcon, Hospital, ClipboardIcon, Pill } from 'lucide-react'
import Link from 'next/link';

export default function HMSDashboard() {
  return (
    <div className="flex flex-col gap-4">
      {/* Top row with small stat cards */}
      <div className="flex flex-wrap gap-4">
        <StatCard title="Total Patients" value="5,678" icon={<Stethoscope />} subtext="+3.2% from last month" />
        <StatCard title="Upcoming Appointments" value="42" icon={<CalendarIcon />} subtext="Next appointment in 30 minutes" />
        <StatCard title="New Medical Alerts" value="3" icon={<MegaphoneIcon />} subtext="Check the alerts dashboard" />
      </div>

      {/* Middle row with larger cards */}
      <div className="flex flex-wrap gap-4">
        <ActionCard link="/dashboard/medRecords" title="Patient Records" value="9,876" icon={<Hospital />} subtext="View patient medical history" buttonText="Access Records" />
        <ActionCard link="/dashboard/inventory" title="Prescriptions" value="234" icon={<ClipboardIcon />} subtext="Active prescriptions" buttonText="Manage Prescriptions" />
        <ActionCard link="/dashboard/inventory" title="Inventory" value="98%" icon={<Pill />} subtext="Average medical stuff" buttonText="View Vitals" />
      </div>

      {/* Bottom row with table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Patient Admissions</CardTitle>
          <CardDescription>View the latest patients admitted to the hospital.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Patient ID</TableHead>
                <TableHead className="hidden sm:table-cell">Admission Date</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Emma Johnson</TableCell>
                <TableCell className="hidden sm:table-cell">PAT001</TableCell>
                <TableCell className="hidden sm:table-cell">2024-08-27</TableCell>
                <TableCell className="hidden md:table-cell">Cardiology</TableCell>
                <TableCell className="text-right">Stable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Liam Davis</TableCell>
                <TableCell className="hidden sm:table-cell">PAT002</TableCell>
                <TableCell className="hidden sm:table-cell">2024-08-28</TableCell>
                <TableCell className="hidden md:table-cell">Orthopedics</TableCell>
                <TableCell className="text-right">Under Observation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Smaller stat card component
function StatCard({ title, value, icon, subtext }) {
  return (
    <Card className="flex-1 min-w-[200px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {React.cloneElement(icon, { className: "w-4 h-4 text-muted-foreground" })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
  )
}

// Larger action card component
function ActionCard({ title, value, icon, subtext, buttonText, link }) {
  return (
    <Card className="flex-1 min-w-[250px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {React.cloneElement(icon, { className: "w-4 h-4 text-muted-foreground" })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
      <CardFooter>
        <Link href={link}>
          <Button>{buttonText}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
