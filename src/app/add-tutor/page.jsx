"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { getToken } from "@/lib/getToken";
import { authClient } from "@/lib/auth-client";

const AddTutorPage = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    destination.userEmail = session?.user?.email;

    if (destination.hourlyFee) destination.hourlyFee = Number(destination.hourlyFee);
    if (destination.totalSlot) destination.totalSlot = Number(destination.totalSlot);

    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(destination),
      });

      const data = await res.json();

      if (res.ok && (data.acknowledged || data.insertedId)) {
        toast.success("Tutor added successfully!");
        router.push("/tutors");
      } else {
        toast.error("Failed to add tutor.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl md:p-10">
        
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold md:text-4xl">Add New Tutor</h1>
          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Fill up the tutor information to create a new tutoring session.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            
            {/* Tutor Name */}
            <TextField name="tutorName" isRequired>
              <Label>Tutor Name</Label>
              <Input placeholder="John Doe" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Tutor Photo */}
            <TextField name="photoUrl" isRequired>
              <Label>Photo URL</Label>
              <Input type="url" placeholder="https://imgbb.com/your-image" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Subject / Category Dropdown */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Subject / Category <span className="text-danger">*</span>
              </Label>
              <select
                name="subject"
                required
                className="w-full min-h-10 px-3 py-2 bg-transparent shadow hover:border-default-400 focus:border-primary rounded-2xl text-sm text-default-500 outline-none transition-colors"
                defaultValue=""
              >
                <option value="" disabled>Select subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="ICT">ICT</option>
              </select>
            </div>

            {/* Teaching Mode Dropdown */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Teaching Mode <span className="text-danger">*</span>
              </Label>
              <select
                name="teachingMode"
                required
                className="w-full min-h-10 px-3 py-2 bg-transparent shadow hover:border-default-400 focus:border-primary rounded-2xl text-sm text-default-500 outline-none transition-colors"
                defaultValue=""
              >
                <option value="" disabled>Select teaching mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Available Days */}
            <TextField name="availableDays" isRequired>
              <Label>Available Days</Label>
              <Input placeholder="Sun - Thu" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Available Time */}
            <TextField name="availableTime" isRequired>
              <Label>Available Time Slot</Label>
              <Input placeholder="5:00 PM - 8:00 PM" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Hourly Fee */}
            <TextField name="hourlyFee" type="number" isRequired>
              <Label>Hourly Fee (BDT)</Label>
              <Input type="number" placeholder="500" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Total Slot */}
            <TextField name="totalSlot" type="number" isRequired>
              <Label>Total Slot</Label>
              <Input type="number" placeholder="20" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Session Start Date */}
            <TextField name="sessionStartDate" type="date" isRequired>
              <Label>Session Start Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Location */}
            <TextField name="location" isRequired>
              <Label>Location (Area / City)</Label>
              <Input placeholder="Dhanmondi, Dhaka" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Institution */}
            <TextField name="institution" isRequired>
              <Label>Institution</Label>
              <Input placeholder="University of Dhaka" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Experience */}
            <TextField name="experience" isRequired>
              <Label>Experience</Label>
              <Input placeholder="3 Years Teaching Experience" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label>Description</Label>
                <TextArea
                  placeholder="Write details about teaching style, background, skills, etc..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-cyan-500 text-base font-semibold text-white transition hover:bg-cyan-600"
          >
            Add Tutor
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTutorPage;