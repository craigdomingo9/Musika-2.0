"use client";
import { backButtonName } from "@/lib/constants";
import { useRouter } from "next/navigation";


function BackButton() {
  const router = useRouter();

  return (
    
    <div onClick={() => router.back()} className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 py-auto">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <p className="font-semibold text-opacity">{backButtonName}</p>
    </div>
  )
}

export default BackButton
