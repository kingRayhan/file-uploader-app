import "filepond/dist/filepond.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import React from "react";
import { ICloudinaryFileObject } from "@/models/cloudinary.model";
import { FilePondFile } from "filepond";

interface FileDropzoneProps {
  onFileUpload: (file: ICloudinaryFileObject) => void;
  onFileRemove: (file: FilePondFile) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileUpload,
  onFileRemove,
}) => {
  return (
    <FilePond
      onremovefile={(error, file) => {
        onFileRemove(file);
      }}
      server={{
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "cndirnd5");

          const request = new XMLHttpRequest();
          request.open(
            "POST",
            "https://api.cloudinary.com/v1_1/djwjyopfv/image/upload"
          );

          // Should call the progress method to update the progress to 100% before calling load
          // Setting computable to false switches the loading indicator to infinite mode
          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
          };

          // Should call the load method when done and pass the returned server file id
          // this server file id is then used later on when reverting or restoring a file
          // so your server knows which file to return without exposing that info to the client
          request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
              // the load method accepts either a string (id) or an object
              load(request.responseText);
              onFileUpload(JSON.parse(request.responseText));
            } else {
              // Can call the error method if something is wrong, should exit after
              error("oh no");
            }
          };

          request.send(formData);

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              request.abort();

              // Let FilePond know the request has been cancelled
              abort();
            },
          };
        },
      }}
    />
  );
};

export default FileDropzone;
