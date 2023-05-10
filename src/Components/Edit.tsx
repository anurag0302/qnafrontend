import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/API_URL";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuth from "../hooks/useAuth";

export const Edit = ({ details, onEdit, fetchDetails }: any) => {
  const [show, setShow] = useState(false);
  const [Question, setQuestion] = useState<React.SetStateAction<any>>();
  const [Answer, setAnswer] = useState<React.SetStateAction<any>>("");
  const Did: any = details.Item.questionId;
  var SecondayData: any;
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changeDesc, setChangeDesc] = useState();

  const [image, setImage] = useState({ preview: "", data: "" });

  const { auth, setAuth }: any = useAuth();

  const handleFileChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSave = () => {
    var newAnswer: any = Answer;
    var newQuestion: any = Question;
    var editId: any = details.Item.secondary.length + 1;

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
    var newDate: any = date + "," + details.Item.dateLog;
    setShow(false);

    var secondary = [
      {
        question: details.Item.question,
        answer: details.Item.answer,
        modifyInfo: date,
        editId: editId,
        editedBy: auth.id,
        changeDesc: changeDesc,
        imgdata: details.Item.imageLocation,
      },
      ...details.Item.secondary,
    ];

    if (Question === undefined && Answer === undefined) {
      newQuestion = details.Item.question;
      newAnswer = details.Item.answer;
    }
    if (Question === undefined) {
      // setQuestion(details.Item.question);
      newQuestion = details.Item.question;
    }
    if (Answer === undefined) {
      // setAnswer(details.Item.answer);
      newAnswer = details.Item.answer;
    }
    const data = {
      question: newQuestion,
      answer: newAnswer,
      createdBy: details.Item.createdBy,
      authorRole: details.Item.authorRole,
      id: Did,
      qa: Question + " " + Answer,
      dateLog: newDate,
      secondary: secondary,
      imgLocation: details.Item.imageLocation,
    };

    const formData = new FormData();
    formData.append("image", image.data);
    formData.append("data", JSON.stringify(data));

    const requestOptions = {
      method: "put",
      body: formData,
    };
    fetch(`${API_URL}questions/${Did}`, requestOptions)
      .then((response) => response)
      .then(async (res) => {
        MySwal.fire({
          position: "center",
          icon: "success",
          title: '"Question Answer Edit Sucessfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchDetails();
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });

    // onEdit();
    navigate(`/Details/${Did}`);
    // window.location.reload();
  };

  return (
    <>
      <Button className="btn w-100 mb-3 text-light" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mb-2"
          style={{ height: "20px", width: "20px", margin: "5px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label>
                <b>Question</b>
              </label>
              <textarea
                className="form-control"
                defaultValue={details.Item.question}
                id="Question"
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              ></textarea>
              <br />
              <label>
                <b> Answer</b>
              </label>
              {/* show quill editing area */}
              {/* <textarea
                className="form-control"
                defaultValue={details.Item.answer}
                id="Answer"
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              ></textarea> */}
              <ReactQuill
                theme="snow"
                defaultValue={details.Item.answer}
                onChange={setAnswer}
              />
              <label htmlFor="answer" className="form-label">
                Select Image
              </label>
              <input
                type="file"
                className="form-control"
                name="upload_file"
                onChange={handleFileChange}
              />
              <label className="my-2">Note (Changes Made)</label>
              <textarea
                className="form-control"
                defaultValue={changeDesc}
                onChange={(e: any) => setChangeDesc(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
