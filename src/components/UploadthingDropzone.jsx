import { UploadDropzone } from "./uploadthing";

export const OurUploadDropzone = ({
  endpoint = "imageUploader",
  onUploadComplete,
  onUploadError,
  onUploadBegin,
  onDrop,
}) => (
  <UploadDropzone
    className="p-6"
    endpoint={endpoint}
    config={{ mode: "auto" }}
    appearance={{
      button: { display: "none" },
    }}
    content={{
      label: "اسحب الصور هنا أو اضغط للاختيار",
    }}
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      if (onUploadComplete) {
        onUploadComplete(res);
      }
    }}
    onUploadError={(error) => {
      console.error("Upload error:", error);
      if (onUploadError) {
        onUploadError(error);
      }
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
      if (onUploadBegin) {
        onUploadBegin(name);
      }
    }}
    onDrop={(acceptedFiles) => {
      // Do something with the accepted files
      console.log("Accepted files: ", acceptedFiles);
      if (onDrop) {
        onDrop(acceptedFiles);
      }
    }}
  />
);
