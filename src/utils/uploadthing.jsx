import { generateUploadDropzone } from "@uploadthing/react";

// Generate the UploadDropzone component
// The URL should point to your UploadThing API endpoint
export const UploadDropzone = generateUploadDropzone({
  url: `${import.meta.env.VITE_BASE_URL}/api/uploadthing`,
});
