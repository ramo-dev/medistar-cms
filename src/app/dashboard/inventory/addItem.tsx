
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

export default function AddInventoryItem() {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData);

    const expiryDate = year && month && day ? `${year}-${month}-${day}` : null;

    const submissionData = {
      ...formDataObject,
      expiryDate,
    };

    console.log("Form submitted:", submissionData);
    setOpen(false);
  };

  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear + i).toString()
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />New Inventory Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
          <DialogDescription>
            Enter the new inventory item details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            {/* First column */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Item Name */}
              <div className="flex gap-4 items-center">
                <Label htmlFor="itemName" className="w-1/3 text-right">
                  Item Name
                </Label>
                <Input
                  id="itemName"
                  name="itemName"
                  className="flex-1"
                  required
                />
              </div>

              {/* Category */}
              <div className="flex gap-4 items-center">
                <Label htmlFor="category" className="w-1/3 text-right">
                  Category
                </Label>
                <Select name="category" required>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="flex gap-4 items-center">
                <Label htmlFor="quantity" className="w-1/3 text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  className="flex-1"
                  required
                />
              </div>
            </div>

            {/* Second column */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Expiry Date */}
              <div className="flex gap-4 items-center">
                <Label htmlFor="expiryDate" className="w-1/3 text-right">
                  Expiry Date
                </Label>
                <div className="flex flex-1 gap-2">
                  <Select value={day} onValueChange={setDay} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={month} onValueChange={setMonth} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m, index) => (
                        <SelectItem key={m} value={m}>
                          {new Date(2000, index).toLocaleString("default", {
                            month: "long",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={year} onValueChange={setYear} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Supplier */}
              <div className="flex gap-4 items-center">
                <Label htmlFor="supplier" className="w-1/3 text-right">
                  Supplier
                </Label>
                <Input
                  id="supplier"
                  name="supplier"
                  className="flex-1"
                  required
                />
              </div>

              {/* Notes */}
              <div className="flex gap-4 items-center">
                <Label htmlFor="notes" className="w-1/3 text-right">
                  Notes
                </Label>
                <Textarea id="notes" name="notes" className="flex-1" />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end">
            <Button type="submit">Save Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
