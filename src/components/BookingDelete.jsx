"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BookingDelete({ bookingId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // 1. Fetch token inside the handler, right before the request
       const { data: tokendata } = await authClient.token();

      // 2. Fix the URL to pass bookingId, matching the backend route
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
           authorization: `Bearer ${tokendata?.token}`
        },
      });

      if (res.ok) {
        // 3. Smoothly refresh the server component data
        router.refresh(); 
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button 
        variant="danger" 
        className="cancel-btn" 
        disabled={isDeleting}
      >
        {isDeleting ? "Canceling..." : "Cancel"}
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel your booking and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Keep Booking
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Yes, Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}