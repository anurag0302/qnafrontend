import {
  IconDefinition,
  faFile,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ImageContainer = ({
  dbImages,
  setDbImages,
  selectedImages,
  setSelectedImages,
}: any) => {
  //   const [dbImages, setDbImages] = useState(imageLocation);
  useEffect(() => {}, [dbImages, selectedImages]);

  return (
    <PhotoProvider>
      {dbImages.map((file: any, index: any) => {
        const FileType = () => {
          const fileExtension = file
            .substring(file.lastIndexOf(".") + 1)
            .toLowerCase()
            .toString();
          //console.log(fileExtension);

          return fileExtension;
        };
        const fltype = FileType();

        if (fltype === "png" || fltype === "jpeg" || fltype === "jpg") {
          //console.log(file);
          return (
            <div
              key={index}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                verticalAlign: "bottom",
                margin: "10px",
              }}
            >
              <PhotoView src={file}>
                <img
                  src={file}
                  style={{
                    height: "170px",
                    width: "170px",
                  }}
                  alt="Uploaded_Image"
                />
              </PhotoView>
              <button
                className="image__delete"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  setDbImages(
                    dbImages.filter(
                      (e: any, mapindex: number) => mapindex !== index
                    )
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Remove
              </button>
            </div>
          );
        } else if (
          fltype === "mp4" ||
          fltype === "mov" ||
          fltype === "avi" ||
          fltype === "mkv"
        ) {
          return (
            <div
              key={index}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                verticalAlign: "bottom",
                margin: "10px",
              }}
            >
              <video controls width="272" height="150">
                <source src={file} type="video/mp4" />
              </video>
              <button
                className="image__delete"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  setDbImages(
                    dbImages.filter(
                      (e: any, mapindex: number) => mapindex !== index
                    )
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Remove
              </button>
            </div>
          );
        } else {
          // Helper function to get the file icon based on file type
          const getFileIcon = (fileType: string): IconDefinition => {
            // Define the mapping of file types to FA icons
            const iconMap: { [key: string]: IconDefinition } = {
              pdf: faFilePdf,
              xlsx: faFileExcel,
              xls: faFileExcel,
              // Add more file types and their respective FA icons
            };

            // Return the FA icon based on the file type
            return iconMap[fileType] || faFile;
          };
          // Split the URL by "/"
          const urlParts = file.split("/");

          // Get the last part of the URL
          const lastPart = urlParts[urlParts.length - 1];

          // Decode the URL-encoded string
          const decodedString = decodeURIComponent(
            lastPart.replace("%20", " ")
          );

          // Extract the original filename
          const originalFilename: any = decodedString.split("?")[0];

          const fileName = originalFilename.substring(36);

          return (
            <div
              key={index}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                verticalAlign: "bottom",
                margin: "10px",
              }}
            >
              <div>
                <span>
                  <FontAwesomeIcon
                    className="fa-6x"
                    icon={getFileIcon(fltype)}
                  />
                  {fileName}
                </span>
              </div>
              <button
                className="image__delete"
                onClick={(e) => {
                  e.preventDefault();
                  setDbImages(
                    dbImages.filter(
                      (e: any, mapindex: number) => mapindex !== index
                    )
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Remove
              </button>
            </div>
          );
        }
      })}
      {selectedImages &&
        selectedImages.map((file: any, index: any) => {
          if (file.type.startsWith("image")) {
            return (
              <div
                className="single__image"
                key={index}
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  verticalAlign: "bottom",
                  margin: "10px",
                }}
              >
                <PhotoView src={file.preview}>
                  <img
                    src={file.preview}
                    style={{
                      height: "170px",
                      width: "170px",
                    }}
                    alt="Uploaded_Image"
                  />
                </PhotoView>

                <button
                  className="image__delete"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImages(
                      selectedImages.filter((e: any) => e !== file)
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            );
          } else if (file.type.startsWith("video")) {
            return (
              <div
                key={index}
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  verticalAlign: "bottom",
                  margin: "10px",
                }}
              >
                <video controls width="272" height="150">
                  <source src={file.preview} type="video/mp4" />
                </video>
                <button
                  className="image__delete"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImages(
                      selectedImages.filter((e: any) => e !== file)
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            );
          } else {
            // Helper function to get the file icon based on file type
            const getFileIcon = (fileType: string): IconDefinition => {
              // Define the mapping of file types to FA icons
              const iconMap: { [key: string]: IconDefinition } = {
                "application/pdf": faFilePdf,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  faFileExcel,
                // Add more file types and their respective FA icons
              };

              // Return the FA icon based on the file type
              return iconMap[fileType] || faFile;
            };
            return (
              <div
                key={index}
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  verticalAlign: "bottom",
                  margin: "10px",
                }}
              >
                <div>
                  <span>
                    <FontAwesomeIcon icon={getFileIcon(file.type)} />
                    {file.name}
                  </span>
                </div>
                <button
                  className="image__delete"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImages(
                      selectedImages.filter((e: any) => e !== file)
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            );
          }
        })}
    </PhotoProvider>
  );
};

export default ImageContainer;
