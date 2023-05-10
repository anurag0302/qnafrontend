import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "./Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../services/API_URL";
import EditedInfo from "./EditedInfo";
import * as DOMPurify from "dompurify";

interface secData {
  question: string;
  answer: string;
  modifyInfo: string;
}

export const Details = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  //edited info / previous edits is stored here
  const [secondaryData, setSecondary] = useState<secData[]>([]);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  // const { Details, kFetch, setDetails } = useFetchDetails();

  const [Details, setDetails] = useState<React.SetStateAction<any>>();
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}questions/${id}`);

      if (!response) {
        console.log("error");
      }
      const data = await response.json();
      setDetails(data);
      console.log(data);
      if (data.Item.secondary.length === 0) {
        setSecondary([]);
      } else {
        setSecondary(data.Item.secondary);
        console.log(secondaryData);
      }
    } catch (err) {
      console.log("error", err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const handleEdit = () => {
    // console.log("details", Details);
    // setDetails([]);
  };
  const MySwal = withReactContent(Swal);
  const handleDelete = () => {
    const requestOptions = {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${API_URL}questions/${id}`, requestOptions)
      .then((response) => response)
      .then((res) =>
        MySwal.fire({
          position: "center",
          icon: "success",
          title: '"Question Answer Delete!',
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    navigate("/");
  };

  const showEditedInfo = () => {
    // setDateLog(Details.Item.dateLog.split(","));
    if (Details.Item.secondary.length === 0) {
      Toast.fire({
        icon: "error",
        title: "No Edit History found",
      });
    } else {
      // console.log(Details.Item.secondary);
      // setSecondary((result) => [...result, ...Details.Item.secondary]);
      setSecondary(Details.Item.secondary);
      //setValue(Details.Item.secondary)
      // console.log(secondaryData);
    }
  };

  const { auth, setAuth }: any = useAuth();

  if (auth.role === "User")
    return (
      <>
        {Details && (
          <div className="container-fluid h-100">
            <div className="row mt-3 ">
              <div className="col-lg-8 col-md-8 p-4 h-100">
                <h3>Question: {Details.Item.question} </h3>
                <h5>Answer: {Details.Item.answer}</h5>
                {Details.Item.imageLocation !== "null" ? (
                  <img
                    style={{ marginLeft: "20px" }}
                    className="previewimg"
                    src={Details.Item.imageLocation}
                    alt="UploadImage"
                    width="200"
                    height="200"
                  />
                ) : (
                  <></>
                )}
              </div>
              {/* Edited Info and Buttons Panel does not show on User*/}
            </div>
          </div>
        )}
      </>
    );
  else
    return (
      <>
        {Details && (
          <div className="container-fluid h-100">
            <div className="row mt-3 ">
              <div
                className="col-lg-8 col-md-8 p-4 h-100"
                style={{ borderRight: "5px solid black" }}
              >
                <h3>Q: {Details.Item.question} </h3>
                <br />
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(Details.Item.answer),
                  }}
                />
                {Details.Item.imageLocation !== "null" ? (
                  <img
                    style={{ marginLeft: "20px" }}
                    className="previewimg"
                    src={Details.Item.imageLocation}
                    alt="UploadImage"
                    width="200"
                    height="200"
                  />
                ) : (
                  <></>
                )}
              </div>

              {/* Edited Info and Buttons Panel */}

              <div className="col-lg-4 col-md-4 d-flex flex-column justify-content-center align-items-center">
                <div className="card text-center bg-light text-dark mb-4 col-sm-6 col-md-10">
                  <div className="card-header">Admin Panel</div>
                  <div className="card-body">
                    <Edit
                      details={Details}
                      onEdit={handleEdit}
                      fetchDetails={fetchDetails}
                    />
                    <button
                      className="btn btn-danger w-100 mb-3"
                      onClick={handleDelete}
                    >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete Post
                    </button>
                  </div>
                </div>
                {/* <div className="container d-flex flex-column w-50 mb-4 justify-content-center">
                  <Edit
                    details={Details}
                    onEdit={handleEdit}
                    fetchDetails={fetchDetails}
                  />
                  &nbsp; &nbsp;
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  &nbsp; &nbsp;
                  {/* <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      showEditedInfo();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-1 h-1"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    Refresh Prev Edits
                  </button> */}
                {/* </div> */}
                {secondaryData.length > 0 ? (
                  <div className="container d-flex justify-content-center">
                    <ul className="list-group">
                      <EditedInfo data={secondaryData} />
                    </ul>
                  </div>
                ) : (
                  <div className="container d-flex justify-content-center">
                    <ul className="list-group">
                      <p>No Edited Info Present</p>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
};

//old return for edited info
// return (
//   <div
//     className="accordion"
//     id="accordionExample"
//     key={val.editId}
//     style={{ marginBottom: "10px" }}
//   >
//     <div className="accordion-item">
//       <h2 className="accordion-header" id={`heading` + val.editId}>
//         <button
//           className="accordion-button"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target={`#collapse` + val.editId}
//           aria-expanded="true"
//           aria-controls={`collapse` + val.editId}
//         >
//           {val.modifyInfo}
//         </button>
//       </h2>
//       <div
//         id={`collapse` + val.editId}
//         className="accordion-collapse collapse"
//         aria-labelledby={`heading` + val.editId}
//         data-bs-parent="#accordionExample"
//       >
//         <div className="accordion-body">
//           Ques: {val.question}
//           <br />
//           Ans: {val.answer}
//         </div>
//       </div>
//     </div>
//   </div>
// );
