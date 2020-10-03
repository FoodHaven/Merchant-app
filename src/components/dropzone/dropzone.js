import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import request from "superagent";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

const CLOUDINARY_UPLOAD_PRESET = "sinme3ku";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/kevinz917/upload";

const Upload = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    setUploadedUrl("");
    setUploadedFile(acceptedFiles[0]);
    console.log(acceptedFiles[0]);

    if (acceptedFiles.length > 0) {
      let upload = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", acceptedFiles[0]);

      console.log("Logging");

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }

        if (response.body.secure_url !== "") {
          props.setImageURL(response.body.secure_url);
          setUploadedUrl(response.body.secure_url);
          console.log("Success");
        }
      });
    }
  }, [acceptedFiles]);

  const handleImageUpload = async () => {
    console.log(uploadedFile);
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", uploadedFile);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        setUploadedUrl(response.body.secure_url);
        console.log("Success");
      }
    });
  };

  return (
    <div>
      <div>
        <section className="container">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="bg-gray-200 w-full rounded-lg border-dashed border-gray-400 border-4 flex items-center justify-center"
            style={{ height: props.height }}
          >
            <div>
              <input {...getInputProps()} />
              <div>
                {acceptedFiles.length > 0 && uploadedUrl.length > 0 ? (
                  <div className="flex flex-col justify-center">
                    <div>{acceptedFiles[0].name} </div>
                    <div className="text-center">Click to upload again</div>
                  </div>
                ) : acceptedFiles.length > 0 ? (
                  <div>
                    <MoonLoader size={40} />
                  </div>
                ) : (
                  <div>{props.text}</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <br />
    </div>
  );
};

export default Upload;
