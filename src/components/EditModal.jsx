"use client";

import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

const EditModal = ({ tutor }) => {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!tutor?._id) {
      toast.error("Error: Tutor ID not found.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const updatedTutor = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination/${tutor._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTutor),
      });

      if (!res.ok) throw new Error("Failed to update");

      const data = await res.json();

        toast.success("Session Updated Successfully!");
      router.refresh();
      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Modal>
      <Button className="w-full rounded-2xl text-white btn-update">
        Update
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-5xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Update Tutor Session</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Edit your tutor information below.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="space-y-8" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    
                    {/* Notice: defaultValue is now moved onto <TextField> */}
                    
                    {/* Tutor Name */}
                    <TextField name="tutorName" defaultValue={tutor?.tutorName || ""}>
                      <Label>Tutor Name</Label>
                      <Input />
                    </TextField>

                    {/* Tutor Photo */}
                    <TextField name="photoUrl" defaultValue={tutor?.photoUrl || ""}>
                      <Label>Photo URL</Label>
                      <Input
                        type="url"
                        placeholder="https://imgbb.com/your-image"
                        className="rounded-2xl"
                      />
                    </TextField>

                    {/* Subject */}
                    <TextField name="subject" defaultValue={tutor?.subject || ""}>
                      <Label>Subject</Label>
                      <Input placeholder="ICT" className="rounded-2xl" />
                    </TextField>

                    {/* Teaching Mode */}
                    <TextField name="teachingMode" defaultValue={tutor?.teachingMode || ""}>
                      <Label>Teaching Mode</Label>
                      <Input placeholder="Online / Offline / Both" className="rounded-2xl" />
                    </TextField>

                    {/* Available Days */}
                    <TextField name="availableDays" defaultValue={tutor?.availableDays || ""}>
                      <Label>Available Days</Label>
                      <Input placeholder="Sun - Thu" className="rounded-2xl" />
                    </TextField>

                    {/* Available Time */}
                    <TextField name="availableTime" defaultValue={tutor?.availableTime || ""}>
                      <Label>Available Time Slot</Label>
                      <Input placeholder="5:00 PM - 8:00 PM" className="rounded-2xl" />
                    </TextField>

                    {/* Hourly Fee */}
                    <TextField name="hourlyFee" defaultValue={tutor?.hourlyFee || ""}>
                      <Label>Hourly Fee (BDT)</Label>
                      <Input type="number" placeholder="500" className="rounded-2xl" />
                    </TextField>

                    {/* Total Slot */}
                    <TextField name="totalSlot" defaultValue={tutor?.totalSlot || ""}>
                      <Label>Total Slot</Label>
                      <Input type="number" placeholder="20" className="rounded-2xl" />
                    </TextField>

                    {/* Session Start Date */}
                    <TextField name="sessionStartDate" defaultValue={tutor?.sessionStartDate || ""}>
                      <Label>Session Start Date</Label>
                      <Input type="date" className="rounded-2xl" />
                    </TextField>

                    {/* Location */}
                    <TextField name="location" defaultValue={tutor?.location || ""}>
                      <Label>Location</Label>
                      <Input placeholder="Dhanmondi, Dhaka" className="rounded-2xl" />
                    </TextField>

                    {/* Institution */}
                    <TextField name="institution" defaultValue={tutor?.institution || ""}>
                      <Label>Institution</Label>
                      <Input placeholder="University of Dhaka" className="rounded-2xl" />
                    </TextField>

                    {/* Experience */}
                    <TextField name="experience" defaultValue={tutor?.experience || ""}>
                      <Label>Experience</Label>
                      <Input placeholder="3 Years Experience" className="rounded-2xl" />
                    </TextField>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField name="description" defaultValue={tutor?.description || ""}>
                        <Label>Description</Label>
                        <TextArea className="rounded-3xl" />
                      </TextField>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="h-14 w-full rounded-2xl bg-cyan-500 text-base font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Edit Tutor
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;