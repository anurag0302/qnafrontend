import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "./Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../services/API_URL";
import EditedInfo from "./EditedInfo";

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

              {/* Edited Info and Buttons Panel */}

              <div className="col-lg-4 col-md-4">
                <div className="container d-flex text-Center mb-4">
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
                </div>
                {secondaryData.length > 0 ? (
                  <div className="container d-flex justify-content-between ">
                    <ul className="list-group">
                      <p>Last Edited on</p>
                      <EditedInfo data={secondaryData} />
                    </ul>
                  </div>
                ) : (
                  <div className="container d-flex justify-content-between ">
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
