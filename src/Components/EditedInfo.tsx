import DOMPurify from "dompurify";
import { Accordion } from "react-bootstrap";
import { PhotoProvider, PhotoView } from "react-photo-view";

const EditedInfo = ({ data }: any) => {
  console.log(data);
  return (
    <>
      <h5 className="mb-3">Previous Edits </h5>
      <div
        className="list-group pe-1"
        style={{ overflow: "auto", height: "350px" }}
      >
        <Accordion>
          {data.map((val: any, index: number) => (
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>
                <div>
                  {val.modifyInfo}
                  <br />
                  {val.editedBy}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(val.answer),
                  }}
                />
                <PhotoProvider>
                  {val.imgdata.map((image: any) => {
                    return (
                      <PhotoView src={image}>
                        <img
                          src={image}
                          style={{ height: "100px", width: "100px" }}
                          alt="Uploaded_Image"
                        />
                      </PhotoView>
                    );
                  })}
                </PhotoProvider>
              </Accordion.Body>
            </Accordion.Item>

            // <div
            //   key={index}
            //   className="list-group-item list-group-item-action list-group-item-dark"
            //   aria-current="true"
            //   style={{ maxHeight: "150px" }}
            // >
            //   <div className="d-flex w-100 justify-content-between">
            //     <h5 className="mb-1">{val.changeDesc}</h5>
            //     <small>{val.modifyInfo}</small>
            //   </div>
            //   <p className="mb-1">
            //     {/* {val.answer.length > 40
            //       ? val.answer.substring(0, 40) + "..."
            //       : val.answer} */}
            //     {val.editedBy}

            //   </p>
            //   <small></small>
            // </div>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default EditedInfo;
