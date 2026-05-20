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
import Link from "next/link";

import React from "react";
import { toast } from "react-toastify";

const AddTutorPage = () => {
    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const destination = Object.fromEntries(formData.entries())
        const session = await auth.api.getSession({
            headers: await headers(),
          });
          const user = session?.user;
        
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination`,
    {method: "POST",
    headers: {
        "content-type": "application/json",
        //  authorization: `Bearer ${token}`
    },
    body: JSON.stringify(destination)}
)
const data = await res.json();
toast.success("Tutor added");
    }
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl md:p-10">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold md:text-4xl">
            Add New Tutor
          </h1>

          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Fill up the tutor information to create a new tutoring
            session.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Tutor Name */}
            <TextField name="tutorName" isRequired>
              <Label>Tutor Name</Label>

              <Input
                placeholder="John Doe"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Tutor Photo */}
            <TextField name="photoUrl" isRequired>
              <Label>Photo URL</Label>

              <Input
                type="url"
                placeholder="https://imgbb.com/your-image"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Subject / Category */}
            <div>
              <Select
                name="subject"
                isRequired
                placeholder="Select subject"
                className="w-full"
              >
                <Label>Subject / Category</Label>

                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item
                      id="Mathematics"
                      textValue="Mathematics"
                    >
                      Mathematics
                    </ListBox.Item>

                    <ListBox.Item
                      id="Physics"
                      textValue="Physics"
                    >
                      Physics
                    </ListBox.Item>

                    <ListBox.Item
                      id="Chemistry"
                      textValue="Chemistry"
                    >
                      Chemistry
                    </ListBox.Item>

                    <ListBox.Item
                      id="Biology"
                      textValue="Biology"
                    >
                      Biology
                    </ListBox.Item>

                    <ListBox.Item
                      id="English"
                      textValue="English"
                    >
                      English
                    </ListBox.Item>

                    <ListBox.Item
                      id="ICT"
                      textValue="ICT"
                    >
                      ICT
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Teaching Mode */}
            <div>
              <Select
                name="teachingMode"
                isRequired
                placeholder="Select teaching mode"
                className="w-full"
              >
                <Label>Teaching Mode</Label>

                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item
                      id="Online"
                      textValue="Online"
                    >
                      Online
                    </ListBox.Item>

                    <ListBox.Item
                      id="Offline"
                      textValue="Offline"
                    >
                      Offline
                    </ListBox.Item>

                    <ListBox.Item
                      id="Both"
                      textValue="Both"
                    >
                      Both
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Available Days */}
            <TextField name="availableDays" isRequired>
              <Label>Available Days</Label>

              <Input
                placeholder="Sun - Thu"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Available Time */}
            <TextField name="availableTime" isRequired>
              <Label>Available Time Slot</Label>

              <Input
                placeholder="5:00 PM - 8:00 PM"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Hourly Fee */}
            <TextField
              name="hourlyFee"
              type="number"
              isRequired
            >
              <Label>Hourly Fee (BDT)</Label>

              <Input
                type="number"
                placeholder="500"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Total Slot */}
            <TextField
              name="totalSlot"
              type="number"
              isRequired
            >
              <Label>Total Slot</Label>

              <Input
                type="number"
                placeholder="20"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Session Start Date */}
            <TextField
              name="sessionStartDate"
              type="date"
              isRequired
            >
              <Label>Session Start Date</Label>

              <Input
                type="date"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Location */}
            <TextField name="location" isRequired>
              <Label>Location (Area / City)</Label>

              <Input
                placeholder="Dhanmondi, Dhaka"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Institution */}
            <TextField name="institution" isRequired>
              <Label>Institution</Label>

              <Input
                placeholder="University of Dhaka"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Experience */}
            <TextField name="experience" isRequired>
              <Label>Experience</Label>

              <Input
                placeholder="3 Years Teaching Experience"
                className="rounded-2xl"
              />

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

          {/* BUTTON */}
          <Link href={"/"}> 
          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-cyan-500 text-base font-semibold text-white transition hover:bg-cyan-600"
          >Add Tutor
          </Button>
          </Link>
          
        </form>
      </div>
    </div>
  );
};

export default AddTutorPage;