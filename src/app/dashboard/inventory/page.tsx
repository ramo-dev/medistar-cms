
"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, PlusCircle } from 'lucide-react'
import AddItem from './addItem';


export default function InventoryComponent() {
  const [doctor, setDoctor] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");


  useEffect(() => {
    async function fetchDoctors() {

      try {
        console.log("this params:")
        const resp = await fetch(`http://localhost:4000/inventory`);
        const data = await resp.json();

        console.log(data);
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setDoctor([]);

      }
    }
    fetchDoctors();
  }, [])




  const filteredItems = doctor.filter(items =>
    items.name.toLowerCase().includes(searchTerms.toLowerCase()));


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='mb-5'>Pharmacy Inventory</CardTitle>
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search inventory" className="pl-8" onChange={e => setSearchTerms(e.target.value)} />
          </div>
          <AddItem />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Reorder Level</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.reorderLevel}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${item.stock > item.reorderLevel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {item.stock > item.reorderLevel ? 'In Stock' : 'Low Stock'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
