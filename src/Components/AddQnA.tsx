import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API_URL } from "../services/API_URL";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddQnA.css";

const AddQnA = () => {
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [image, setImage] = useState({ preview: "", data: "" });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // const handleInputChangeImage = (event: any) => {
  //   if (event.target.files[0] === undefined) {
  //     setuserInfo({
  //       ...userInfo,
  //       image: "",
  //       filepreview: "",
  //     });
  //   } else {
  //     setuserInfo({
  //       ...userInfo,
  //       image: event.target.files[0],
  //       filepreview: URL.createObjectURL(event.target.files[0]),
  //     });
  //   }
  // };

  const handleFileChange = (e: any) => {
    // const img = {
    //   preview: URL.createObjectURL(e.target.files[0]),
    //   data: e.target.files[0],
    // };
    // setImage(img);
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    //console.log(selectedFilesArray);
    const imagesArray = selectedFilesArray.map((file: any) =>
      URL.createObjectURL(file)
    );
    console.log(imagesArray);
    setSelectedImages((prevImages) => prevImages?.concat(imagesArray));
  };

  const handleAdd = (e: any) => {
    if (Question === "" || Answer === "") {
      alert("please Add all the fields");
      return;
    }
    const current = new Date();
    const currentDateTime = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const date =
      `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}` +
      " " +
      `${currentDateTime}`;

    const formData = new FormData();
    formData.append("image", image.data);

    const data = {
      question: Question,
      answer: Answer,
      status: 1,
      dateLog: date,
      secondary: [],
    };

    formData.append("data", JSON.stringify(data));

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch(API_URL + "Questions", requestOptions)
      .then((response) => response)
      .then((res) =>
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Question Answer Added!",
          text: "You're being rediected to homePage",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) => {
        MySwal.fire({
          position: "center",
          icon: "error",
          title: "Oops..  ",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    navigate("/");
  };

  const onSelectFile = () => {};

  return (
    <>
      <div className="container-lg mt-3">
        <div className="row justify-content-center my-3">
          <div className="col-lg-6 text-start">
            <h2 style={{ textAlign: "center" }}>
              Add Q<span style={{ color: "red" }}>n</span>A
            </h2>
            <form>
              <div className="mb-3">
                <label htmlFor="question" className="form-label">
                  Question<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  value={Question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </div>

              <div className="my-3">
                <label htmlFor="answer" className="form-label">
                  Answer<span style={{ color: "red" }}>*</span>
                </label>
                {/* change old input with react quill */}
                {/* <textarea
                  rows={3}
                  className="form-control"
                  id="answer"
                  value={Answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                /> */}
                <ReactQuill theme="snow" value={Answer} onChange={setAnswer} />
              </div>
              <div className="my-3 image__div">
                <label htmlFor="images" className="add__image">
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Add Image
                  <br />
                  <span>(max 4 images)</span>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    onChange={handleFileChange}
                    multiple
                    accept="image/png , image/jpeg, image/webp"
                  />
                </label>
                {selectedImages &&
                  selectedImages.map((image, index) => (
                    <div className="single__image" key={index}>
                      <img
                        src={image}
                        alt="uploadedImage"
                        height={200}
                        width={200}
                      />
                      <button
                        className="image__delete"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedImages(
                            selectedImages.filter((e) => e !== image)
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
                  ))}
                {/* <input
                  type="file"
                  className="form-control"
                  name="upload_file"
                  onChange={handleFileChange}
                /> */}
              </div>

              {selectedImages?.length > 0 && selectedImages?.length > 10 ? (
                <p>Please upload less than 10 images.</p>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleAdd}
                >
                  Add QnA
                </button>
              )}
            </form>
          </div>
          {/* Preview of Image to be uploaded (single) */}
          {/* <div className="col-lg-6 text-start ">
            {image.preview !== "" ? (
              <img
                style={{ marginLeft: "20px" }}
                className="previewimg"
                src={image.preview}
                alt="UploadImage"
                width="350"
                height="350"
              />
            ) : null}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AddQnA;
