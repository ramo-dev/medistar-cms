
"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function GoBackBtn() {

  const router = useRouter();

  function handleNavigate() {
    router.back()
  };


  return (
    <Button size="icon" onClick={handleNavigate} className="relative mb-4 rounded-full">
      <ArrowLeft />
    </Button>
  )
}
