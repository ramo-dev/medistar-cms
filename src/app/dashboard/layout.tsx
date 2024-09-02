
"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Activity, Clipboard, Users, Calendar, Settings, Menu, Search, Building2, Stethoscope, Pill } from 'lucide-react'
import NewPatient from "./components/newPatient"
import CalendarPrev from "./components/calendar"
import GoBackBtn from "./components/goBackBtn"
import useAuthStore from "../utils/store/Authstore"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Loading from "./loading"


export default function HMSLayout({ children }) {

  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();


  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col justify-center items-center space-y-10">
        <h1 className="text-5xl font-bold text-center">Error: 401</h1>

        <Image
          loading="lazy"
          width={200}
          height={200}
          alt="Access Denied"
          src="/images/assets/AccessDenied.svg"
        />

        <h1 className="text-3xl font-bold text-center">
          You are not authorized <br /> to access this page!
        </h1>
      </div>
    );
  }


  function handleLogout() {
    logout();
    router.push("/login")
  }


  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-secondary/30 sm:flex">
        <nav className="flex flex-col gap-4 px-4 py-5">
          <Link
            href="#"
            className="group flex h-10 w-full shrink-0 justify-start gap-4 items-center px-3 rounded-md bg-primary text-lg font-semibold text-primary-foreground md:text-base"

            prefetch={false}
          >
            <Building2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Hospital Management</span>
            Medistar
          </Link>
          <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-muted-foreground focus:text-foreground" prefetch={false}>
            <Activity className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/patients"
            className="flex items-center gap-4 px-2.5 text-muted-foreground focus:text-foreground"
            prefetch={false}
          >
            <Users className="h-5 w-5" />
            Patients
          </Link>
          <Link
            href="/dashboard/doctors"
            className="flex items-center gap-4 px-2.5 text-muted-foreground focus:text-foreground"
            prefetch={false}
          >
            <Stethoscope className="h-5 w-5" />
            Doctors
          </Link>
          <Link
            href="/dashboard/inventory"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <Pill className="h-5 w-5" />
            Inventory
          </Link>

          <Link
            href="/dashboard/medRecords"
            className="flex items-center gap-4 px-2.5 text-muted-foreground focus:text-foreground"
            prefetch={false}
          >
            <Clipboard className="h-5 w-5" />
            Medical Records
          </Link>

        </nav>
        <nav className="mt-auto flex flex-col gap-4 px-4 py-5">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground focus:text-foreground"
            prefetch={false}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col sm:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:max-w-none">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  prefetch={false}
                >
                  <Building2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Hospital Management</span>
                </Link>
                <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                  <Activity className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/patients"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Users className="h-5 w-5" />
                  Patients
                </Link>
                <Link
                  href="/dashboard/doctors"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Stethoscope className="h-5 w-5" />
                  Doctors
                </Link>
                <Link
                  href="/dashboard/inventory"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Pill className="h-5 w-5" />
                  Inventory
                </Link>
                <Link
                  href="/dashboard/medRecords"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Clipboard className="h-5 w-5" />
                  Medical Records
                </Link>
                <Link
                  href="/dashboard/calendar"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Calendar className="h-5 w-5" />
                  Calendar
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h1>Hello, {user && user.firstName + " " + user.secondName}</h1>
          <form className="relative ml-auto flex-1 md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
            />
          </form>
          <CalendarPrev />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-4 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/support">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full p-0 cursor-pointer">
                <Button onClick={handleLogout} variant="destructive" className="m-0 h-8 w-full">
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 relative">
          <GoBackBtn />
          {children}
          <NewPatient />

        </main>
      </div>
    </div>
  )
}
