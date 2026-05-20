"use client";

import {AlertDialog, Button} from "@heroui/react";


export function Delete({tutor}) {

const handleDelete=async()=>{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination/${tutor._id}`,{
    method:"DELETE",
    headers: {"content-type": "application/json"}, 
}
)
const data = await res.json();

}

  return (
    <AlertDialog>
      <Button variant="danger" className='btn-delete'>Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Tutor permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong className="text-black">{tutor.tutorName}</strong> and all of its
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