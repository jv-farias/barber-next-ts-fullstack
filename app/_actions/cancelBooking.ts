"use server"

import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

export const cancelBooking = async (bookingId: string) => {
  // Perform the deletion on the server
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  // Call revalidatePath from a server-side context
  // You might need to wrap this in a server action or an API route
  revalidatePath("/");
  revalidatePath("/bookings");
};