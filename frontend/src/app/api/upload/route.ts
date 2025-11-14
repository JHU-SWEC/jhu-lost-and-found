import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "lost-and-found" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  return NextResponse.json(result);
}
