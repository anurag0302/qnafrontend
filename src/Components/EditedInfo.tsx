import React from "react";

const EditedInfo = ({ data }: any) => {
  return (
    <>
      <h5 className="mb-3">Previous Edits </h5>
      <div
        className="list-group pe-1"
        style={{ overflow: "auto", height: "350px" }}
      >
        {data.map((val: any, index: number) => (
          <a
            key={index}
            href="/"
            className="list-group-item list-group-item-action list-group-item-dark"
            aria-current="true"
            style={{ maxHeight: "150px" }}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {val.question.length > 20
                  ? val.question.substring(0, 20) + "..."
                  : val.question}
              </h5>
              <small>{val.modifyInfo}</small>
            </div>
            <p className="mb-1">
              {/* {val.answer.length > 40
                ? val.answer.substring(0, 40) + "..."
                : val.answer} */}
              display notes changes made
            </p>
            <small>by admin@akshay</small>
          </a>
        ))}
      </div>
    </>
  );
};

export default EditedInfo;
