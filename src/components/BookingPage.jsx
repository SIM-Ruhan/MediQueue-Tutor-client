"use client";

import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";

import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BookingPage = ({ tutor }) => {
  const router = useRouter();
   const { data: session } = authClient.useSession();
   const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const bookingData = Object.fromEntries(
      formData.entries()
    );

    bookingData.bookStatus = "Booked";
 const {data:tokendata} = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/booking`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
           authorization: `Bearer ${tokendata?.token}`
        },
        body: JSON.stringify(bookingData),
      }
    );
    const data = await res.json();



    if (data.insertedId) {
      toast.success("Session Booked Successfully");
    }
  router.push("/booked-sessions")
  };

  return (
    <Modal>
      {/* OPEN MODAL BUTTON */}
      <Button className="w-full rounded-2xl text-white">
        Book Session
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            {/* HEADER */}
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>

              <Modal.Heading>
                Book Tutor Session
              </Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                Complete the form below to confirm your
                tutoring session.
              </p>
            </Modal.Header>

            {/* BODY */}
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col gap-4"
                >
                  {/* Student Name */}
                  <TextField
                    className="w-full"
                    name="studentName"
                    type="text"
                  >
                    <Label>Student Name</Label>

                    <Input
                      placeholder="Enter your name"
                    />
                  </TextField>

                  {/* Phone */}
                  <TextField
                    className="w-full"
                    name="phone"
                    type="tel"
                  >
                    <Label>Phone</Label>

                    <Input placeholder="Enter your phone number" />
                  </TextField>

                  {/* Tutor ID */}
                  <TextField
                    className="w-full"
                    name="tutorId"
                  >
                    <Label>Tutor ID</Label>

                    <Input
                      value={tutor?._id}
                      readOnly
                    />
                  </TextField>

                  {/* Tutor Name */}
                  <TextField
                    className="w-full"
                    name="tutorName"
                  >
                    <Label>Tutor Name</Label>

                    <Input
                      value={tutor?.tutorName}
                      readOnly
                    />
                  </TextField>

                  {/* Student Email */}
                  <TextField
                    className="w-full"
                    name="studentEmail"
                    type="email"
                  >
                    <Label>Student Email</Label>

                    <Input
                      value={user?.email}
                      readOnly
                    />
                  </TextField>

                  {/* Book Status */}
                  <TextField
                    className="w-full"
                    name="bookStatus"
                  >
                    <Label>Book Status</Label>

                    <Input
                      value="Booked"
                      readOnly
                    />
                  </TextField>

                  {/* FOOTER BUTTONS */}
                  <div className="mt-4 flex justify-end gap-3">
                    <Button
                      slot="close"
                      variant="secondary"
                    >
                      Cancel
                    </Button>

                    <Button type="submit">
                      Confirm Booking
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingPage;
