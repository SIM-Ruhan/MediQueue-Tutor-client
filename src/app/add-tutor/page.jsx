"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
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

      if (data.insertedId) {
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
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold md:text-4xl">Add New Tutor</h1>
          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Fill up the tutor information to create a new tutoring session.
          </p>
        </div>

        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            <TextField name="tutorName" isRequired>
              <Label>Tutor Name</Label>
              <Input placeholder="John Doe" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="photoUrl" isRequired>
              <Label>Photo URL</Label>
              <Input type="url" placeholder="https://imgbb.com/your-image" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <div>
              <Select name="subject" isRequired placeholder="Select subject" className="w-full">
                <Label>Subject / Category</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Mathematics" textValue="Mathematics">Mathematics</ListBox.Item>
                    <ListBox.Item id="Physics" textValue="Physics">Physics</ListBox.Item>
                    <ListBox.Item id="Chemistry" textValue="Chemistry">Chemistry</ListBox.Item>
                    <ListBox.Item id="Biology" textValue="Biology">Biology</ListBox.Item>
                    <ListBox.Item id="English" textValue="English">English</ListBox.Item>
                    <ListBox.Item id="ICT" textValue="ICT">ICT</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div>
              <Select name="teachingMode" isRequired placeholder="Select teaching mode" className="w-full">
                <Label>Teaching Mode</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Online" textValue="Online">Online</ListBox.Item>
                    <ListBox.Item id="Offline" textValue="Offline">Offline</ListBox.Item>
                    <ListBox.Item id="Both" textValue="Both">Both</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField name="availableDays" isRequired>
              <Label>Available Days</Label>
              <Input placeholder="Sun - Thu" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="availableTime" isRequired>
              <Label>Available Time Slot</Label>
              <Input placeholder="5:00 PM - 8:00 PM" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="hourlyFee" type="number" isRequired>
              <Label>Hourly Fee (BDT)</Label>
              <Input type="number" placeholder="500" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="totalSlot" type="number" isRequired>
              <Label>Total Slot</Label>
              <Input type="number" placeholder="20" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="sessionStartDate" type="date" isRequired>
              <Label>Session Start Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="location" isRequired>
              <Label>Location (Area / City)</Label>
              <Input placeholder="Dhanmondi, Dhaka" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="institution" isRequired>
              <Label>Institution</Label>
              <Input placeholder="University of Dhaka" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="experience" isRequired>
              <Label>Experience</Label>
              <Input placeholder="3 Years Teaching Experience" className="rounded-2xl" />
              <FieldError />
            </TextField>

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