"use client";

import {AlertDialog, Button} from "@heroui/react";


export async function BookingDelete({bookingId}) {
 const {data:tokendata} = await authClient.token();
const handleDelete=async()=>{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/booking/${bookingId}`,{
    method:"DELETE",
     headers: {
          "content-type": "application/json",
           authorization: `Bearer ${tokendata?.token}`
        }, 
}
)
const data = await res.json();
window.location.reload();
}

  return (
    <AlertDialog>
      <Button variant="danger" className='btn-delete'>Cancel</Button>
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
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}