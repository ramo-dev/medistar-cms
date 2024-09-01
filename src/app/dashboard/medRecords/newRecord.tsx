
"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeftIcon, ChevronRightIcon, SaveIcon, UserPlusIcon, UserIcon, PlusCircle } from 'lucide-react'


export default function AddRecord() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [patientType, setPatientType] = useState<'new' | 'existing' | null>(null)
  const [step, setStep] = useState(1)
  const [patientId, setPatientId] = useState('')

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3))
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1))

  const renderNewPatientForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <RadioGroup defaultValue="male" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea id="medicalHistory" placeholder="Enter past medical conditions, surgeries, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input id="allergies" placeholder="Enter any known allergies" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea id="medications" placeholder="List current medications and dosages" />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Current Symptoms</Label>
              <Textarea id="symptoms" placeholder="Describe current symptoms" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration of Symptoms</Label>
              <Input id="duration" placeholder="How long have you experienced these symptoms?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity (1-10)</Label>
              <Input id="severity" type="number" min="1" max="10" placeholder="Rate severity from 1 to 10" />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderExistingPatientForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="patientId">Patient ID</Label>
        <Input
          id="patientId"
          placeholder="Enter patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="updateReason">Reason for Visit</Label>
        <Textarea id="updateReason" placeholder="Describe the reason for today's visit" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newSymptoms">New Symptoms</Label>
        <Textarea id="newSymptoms" placeholder="Describe any new symptoms" />
      </div>
    </div>
  )

  const dialogContent = () => {
    if (!patientType) {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Medical Record System</CardTitle>
            <CardDescription>Select patient type to proceed</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-x-8">
            <Button
              onClick={() => setPatientType('new')}
              className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-md"
            >
              <UserPlusIcon className="w-16 h-16 mb-2" />
              New Patient
            </Button>
            <Button
              onClick={() => setPatientType('existing')}
              className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-md"
              variant="outline"
            >
              <UserIcon className="w-16 h-16 mb-2" />
              Existing Patient
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {patientType === 'new' ? 'New Patient Registration' : 'Existing Patient Record'}
          </CardTitle>
          <CardDescription>
            {patientType === 'new'
              ? `Step ${step}: ${step === 1 ? 'Patient Information' : step === 2 ? 'Medical History' : 'Current Symptoms'}`
              : 'Update patient record'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {patientType === 'new' ? renderNewPatientForm() : renderExistingPatientForm()}
        </CardContent>
        <CardFooter className="flex justify-between">
          {patientType === 'new' ? (
            <>
              <Button onClick={handlePrev} disabled={step === 1} variant="outline">
                <ChevronLeftIcon className="mr-2 h-4 w-4" /> Previous
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext}>
                  Next <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button>
                  <SaveIcon className="mr-2 h-4 w-4" /> Save Record
                </Button>
              )}
            </>
          ) : (
            <Button className="w-full">
              <SaveIcon className="mr-2 h-4 w-4" /> Update Record
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button><PlusCircle className='me-2 w-5 h-5' />New Medical Record</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Medical Record System</DialogTitle>
        </DialogHeader>
        {dialogContent()}
      </DialogContent>
    </Dialog>
  )
}
