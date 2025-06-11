"use client";

import { useState, useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";

export function GetDailyAlertBtn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // ✅ handle email (API call, etc.)
    console.log("Subscribed with:", email);

    // ✅ Close the dialog
    closeRef.current?.click();

    // ✅ Clear state
    setEmail("");
    setError("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonVariants({ size: "sm" })}>
          Get Daily Alerts <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Daily Kerala PSC Jobs Alerts</DialogTitle>
          <DialogDescription>
            Maybe some notification will change your life and career 👌✨
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter className="sm:justify-center">
          <Button type="button" variant="default" onClick={handleSubmit}>
            Subscribe
          </Button>
          {/* hidden close button triggered manually */}
          <DialogClose asChild>
            <button ref={closeRef} className="hidden" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
