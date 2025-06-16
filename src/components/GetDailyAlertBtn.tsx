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
import { toast } from "sonner"; // Ensure sonner is installed and configured in your root layout

export function GetDailyAlertBtn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State to hold the error message for display
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator
  const closeRef = useRef<HTMLButtonElement>(null); // Ref to programmatically close the dialog

  // Basic email validation regex
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    // 1. Clear any previous errors and set submitting state
    setError("");
    setIsSubmitting(true);

    // 2. Client-side email validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false); // Stop submitting state if validation fails
      return; // Stop execution
    }

    try {
      // 3. Make API call
      // Use a leading slash for absolute path from root for client-side fetches
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // 4. Handle non-OK responses (e.g., 400, 409, 500 from your route.ts)
      if (!res.ok) {
        // Attempt to parse the error response JSON from the server
        // Use .catch() to prevent throwing if res.json() itself fails
        const errorData = await res
          .json()
          .catch(() => ({ message: "An unexpected API error occurred." }));
        // Prioritize the message from the server, fallback to a generic message
        const errorMessage =
          errorData.message || "Failed to subscribe. Please try again.";
        throw new Error(errorMessage); // Throw an error with the specific message
      }

      // 5. Handle success
      toast.success(`You will get daily alerts in ${email}`); // Show success toast
      setEmail(""); // Clear the email input on success
      setError(""); // Clear any lingering error messages
      closeRef.current?.click(); // Programmatically close the dialog
    } catch (err: unknown | Error) {
      // Catch any errors (network errors, or errors thrown above)
      console.error("Subscription Error caught:", err); // Log the full error object for debugging
      // Display the error message in the component's UI
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during subscription."
      );
      // Show the error message as a toast notification
      toast.error(err instanceof Error ? err.message : "Failed to subscribe.");
    } finally {
      // 6. Always reset submitting state regardless of success or failure
      setIsSubmitting(false);
    }
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
              setError(""); // Clear error message as user types
            }}
          />
          {/* Display error message below the input field */}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            variant="default"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
          {/* Hidden button to programmatically close the dialog */}
          <DialogClose asChild>
            <button ref={closeRef} className="hidden" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
