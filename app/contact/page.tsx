import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "contact",
};

export default function ContactPage() {
  return (
    <>
      <div className="flex flex-col gap-6 min-h-screen justify-center items-center px-4">
        <form className="flex flex-col gap-6 max-w-md w-full p-8 bg-card rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill out the form below and we’ll get back to you soon.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your Name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                className="h-24 w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
