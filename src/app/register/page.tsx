"use client"
import React, { useEffect, useState } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { toast } from "sonner"
import useRegister from "../utils/hooks/useRegister"
import { Loader } from "lucide-react"

export default function LoginForm() {

  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: ""
  });

  const { register, error, loading, success } = useRegister();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  async function handleSubmit(e) {
    e.preventDefault();
    console.log(form);

    await register(form);
  }



  useEffect(() => {
    if (success) {
      toast.success("Registration successful!", { duration: 1000 });
      setTimeout(() => {
        toast("Redirecting to login...", { duration: 1500 });
      }, 1000)
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);



  return (

    <div className="relative h-screen object-cover py-10  bg-[url('/images/pills2.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      <Card className=" relative mx-auto max-w-sm ">
        <CardHeader>
          <Link href="/">
            <CardTitle className="text-2xl">
              <Image priority className="mx-auto rounded-full border border-primary/20" src="/images/medistar-favicon-color.png" alt="logo" width={130} height={130} />
              Register
            </CardTitle>

          </Link>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Max"
                  required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="secondName">Second name</Label>
                <Input
                  name="secondName"
                  value={form.secondName}
                  onChange={handleChange}
                  placeholder="Robinson"
                  required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? <Loader className="animate-spin h-5 w-5" /> : "Create an account"}
            </Button>

          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
