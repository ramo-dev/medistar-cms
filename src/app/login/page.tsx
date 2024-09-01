"use client"

import { useState, useEffect } from "react";
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
import { Loader } from "lucide-react";

import useLogin from "../utils/hooks/useLogin";
import { toast } from "sonner";

export default function Page() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const { user, login, loading, error } = useLogin();


  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginForm.email, loginForm.password);
    if (user) {
      toast.success("Login successful!")
    } else {
      toast.error(error)
    }
  };



  return (
    <div className="relative h-screen object-cover py-20 bg-primary/20  bg-[url('/images/login.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      <Card className="relative mx-auto max-w-sm bg-opacity-50">
        {user && user.email}
        <CardHeader>
          <Link href="/">
            <CardTitle className="text-2xl">
              <Image priority className="mx-auto rounded-full border border-primary/20" src="/images/medistar-favicon-color.png" alt="logo" width={130} height={130} />
              Login
            </CardTitle>

          </Link>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
                value={loginForm.email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                required
                onChange={handleChange}
                value={loginForm.password}
              />
            </div>
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? <Loader className="animate-spin h-5 w-5" /> : "Login"}
            </Button>

          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
