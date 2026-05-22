// "use client";

// import {AlertDialog, Button} from "@heroui/react";


// export function Delete({tutor}) {

// const handleDelete=async()=>{
// const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination/${tutor._id}`,{
//     method:"DELETE",
//     headers: {"content-type": "application/json"}, 
// }
// )
// const data = await res.json();
// // window.location.reload();
// }

//   return (
//     <AlertDialog>
//       <Button variant="danger" className='btn-delete'>Delete</Button>
//       <AlertDialog.Backdrop>
//         <AlertDialog.Container>
//           <AlertDialog.Dialog className="sm:max-w-100">
//             <AlertDialog.CloseTrigger />
//             <AlertDialog.Header>
//               <AlertDialog.Icon status="danger" />
//               <AlertDialog.Heading>Delete Tutor permanently?</AlertDialog.Heading>
//             </AlertDialog.Header>
//             <AlertDialog.Body>
//               <p>
//                 This will permanently delete <strong className="text-black">{tutor.tutorName}</strong> and all of its
//                 data. This action cannot be undone.
//               </p>
//             </AlertDialog.Body>
//             <AlertDialog.Footer>
//               <Button slot="close" variant="tertiary">
//                 Cancel
//               </Button>
//               <Button slot="close" variant="danger" onClick={handleDelete}>
//                 Delete
//               </Button>
//             </AlertDialog.Footer>
//           </AlertDialog.Dialog>
//         </AlertDialog.Container>
//       </AlertDialog.Backdrop>
//     </AlertDialog>
//   );
// }

"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Delete({ tutor }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!tutor?._id) {
      console.error("Delete Error: Tutor object or _id is missing!");
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination/${tutor._id}`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json"
          // Cleaned up: No authorization header needed here anymore!
        },
      });

      if (res.ok) {
        router.refresh(); 
      } else {
        const errorText = await res.text();
        console.error(`Backend failed to delete. Status: ${res.status}, Message: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

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
                This will permanently delete <strong className="text-black">{tutor.tutorName || "this tutor"}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" disabled={isDeleting}>
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}