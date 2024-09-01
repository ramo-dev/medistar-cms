

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import Link from "next/link"


export default function Settings() {
  return (
    <div className="flex-1 bg-background pt-10 ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <div className="grid gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="email">Username</Label>
                <Input id="email" type="text" defaultValue="" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={3} defaultValue="I'm a Doctor by profession" />
              </div>
              <Button className="justify-self-end">Save Changes</Button>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="justify-self-end">Change Password</Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">


              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login Activity</p>
                  <p className="text-muted-foreground text-sm">View and manage your login history.</p>
                </div>
                <Link href="#" className="text-primary" prefetch={false}>
                  View Activity
                </Link>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
            <div className="grid gap-4">
              <p className="text-muted-foreground">
                Deleting your account is a permanent action. All your data and account information will be permanently
                removed.
              </p>
              <Button variant="destructive" className="justify-self-end">
                Delete Account
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
