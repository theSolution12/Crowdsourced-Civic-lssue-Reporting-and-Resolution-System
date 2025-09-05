import Image from "next/image"

import { SignupForm } from "@/components/signup-form"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Signup",
}

export default function SignupPage() {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-white flex size-10 items-center justify-center rounded-md overflow-hidden">
                <Image
                  src="/menulogo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold">जनसेतु.</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignupForm />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <div className="absolute inset-0 w-full h-full">
            <video
              src="https://d1xarpci4ikg0w.cloudfront.net/fe197920-9149-4ad4-ad32-72725de071f4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    </>
  )
}
