import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Menu, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <>

      <div className="flex min-h-[100dvh] flex-col">
        <header className="h-[12vh] sticky top-0 w-full bg-primary text-primary-foreground py-4 md:px-16 px-6 flex items-center justify-between z-10">
          <Link href="#" className="md:text-2xl text-xl font-bold" prefetch={false}>
            <Image src="/images/logo-transparent.png" width={100} height={100} alt="logo" />
          </Link>
          <nav className="hidden md:flex gap-4 items-center">
            <Link href="/about" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#contact" className="hover:underline" prefetch={false}>
              Contact
            </Link>
            <Link href="/login" className="hover:bg-black/10 border rounded-md p-1 px-4" prefetch={false}>
              Login
            </Link>
          </nav>
          <Button variant="secondary" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </header>
        <main>
          <section className="relative h-[90dvh] py-12 md:py-20 flex items-center justify-center text-center bg-[url('/images/hero2.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
            <div className="relative px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Welcome to MediStar HMS</h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-8 text-white">
                Advanced Hospital Management System for efficient healthcare administration.
              </p>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Schedule a Demo
              </Link>
            </div>
          </section>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Appointment Scheduling", description: "Effortlessly manage patient appointments with our intuitive scheduling system." },
                  { title: "Electronic Health Records", description: "Securely store and access patient records with our HIPAA-compliant EHR system." },
                  { title: "Billing & Invoicing", description: "Streamline your financial processes with integrated billing and invoicing tools." },
                  { title: "Patient Portal", description: "Empower patients with a secure portal for accessing their health information and communicating with providers." },
                  { title: "Inventory Management", description: "Keep track of medical supplies and equipment with our comprehensive inventory system." },
                  { title: "Reporting & Analytics", description: "Gain valuable insights into your clinic's performance with customizable reports and analytics." },
                ].map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle2 className="h-6 w-6 text-primary mr-2" />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: "Dr. Emily Chen", role: "Family Physician", quote: "MediStar has revolutionized our clinic's efficiency. We've reduced wait times and improved patient satisfaction." },
                  { name: "Mark Johnson", role: "Clinic Administrator", quote: "The billing and reporting features have saved us countless hours and improved our financial performance." },
                  { name: "Dr. Sarah Patel", role: "Pediatrician", quote: "The user-friendly interface and comprehensive features make MediStar an indispensable tool in our practice." },
                ].map((testimonial, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{testimonial.name}</CardTitle>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Basic", price: "$99", features: ["Appointment Scheduling", "Electronic Health Records", "Patient Portal", "Email Support"] },
                  { name: "Professional", price: "$199", features: ["All Basic features", "Billing & Invoicing", "Inventory Management", "Priority Support"] },
                  { name: "Enterprise", price: "Custom", features: ["All Professional features", "Custom Integrations", "Advanced Analytics", "Dedicated Account Manager"] },
                ].map((plan, index) => (
                  <Card key={index} className={index === 1 ? "border-primary" : ""}>
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <p className="text-3xl font-bold">{plan.price}<span className="text-sm font-normal">{plan.price !== "Custom" && "/month"}</span></p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6">Choose Plan</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Clinic?</h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get in touch with our team to learn how MediStar can streamline your healthcare practice.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <Button className="w-full" size="lg">
                    Contact Sales
                  </Button>
                  <p className="text-xs text-gray-500">
                    Our team will get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">© 2023 MediStar. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div >

    </>)
}
