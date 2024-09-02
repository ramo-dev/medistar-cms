"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area";
import useAuthStore from "@/app/utils/store/Authstore"

export default function Settings() {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-20 h-screen w-[60vh] border rounded-md bg-card p-4">
        <form className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/images/medistar-favicon-color.png" alt={`${user?.firstName} ${user?.secondName}`} />
            <AvatarFallback>{user?.firstName[0]}{user?.secondName[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{user?.firstName} {user?.secondName}</h2>
            <p className="text-sm text-muted-foreground">{"Admin"}</p>
          </div>
          <Textarea
            value={"Some doc"}
            className="h-32 resize-none"
            placeholder="Your bio"
          />
          <Button className="w-full">Save changes</Button>
        </form>
      </aside>
      <main className="flex-1 p-6">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={user?.firstName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={user?.secondName}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicRole">Clinic Role</Label>
                  <Select
                    value={"Doc"}
                  >
                    <SelectTrigger id="clinicRole">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                      <SelectItem value="Nurse">Nurse</SelectItem>
                      <SelectItem value="Receptionist">Receptionist</SelectItem>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="w-full">Change Password</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Activity</p>
                    <p className="text-sm text-muted-foreground">View and manage your login history.</p>
                  </div>
                  <Link href="#" className="text-primary hover:underline">
                    View Activity
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Deleting your account is a permanent action. All your data and account information will be permanently
                  removed.
                </p>
                <Button variant="destructive" className="w-full">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
