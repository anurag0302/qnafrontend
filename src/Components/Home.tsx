import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../services/API_URL";
import { Pagination } from "../services/Pgination";
import "./Home.css";

export const Home = ({ transformedData, kFetch }: any) => {
  const { auth, setAuth }: any = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };

  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    kFetch(API_URL + "questions");
  }, [transformedData]);

  //console.log(transformedData);

  const myStyle: any = {
    margin: "10px",
    textAlign: "center",
    paddingBottom: "10px",
  };

  const sortData = () => {
    if (transformedData) {
      transformedData.sort((a: any, b: any) => {
        let aDateArray = a.dateLog.split(",");
        let aDate = Date.parse(aDateArray[aDateArray.length - 1]);
        let bDateArray = b.dateLog.split(",");
        let bDate = Date.parse(bDateArray[bDateArray.length - 1]);

        if (sortOrder === "asc") {
          return aDate > bDate ? -1 : 1;
        }
        if (sortOrder === "desc") {
          return aDate < bDate ? -1 : 1;
        }
        return 0;
      });
    }
  };

  const cardStyle: any = {
    borderRadius: "10px",
    backgroundImage: "linear-gradient(to right, #F0E68C , #FBCEB1)",
    height: "165px",
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const paginate = (item: number) => {
    setCurrentPage(item);
    window.scrollTo(0, 0);
  };
  const lastIndex: number = currentPage * postsPerPage;
  const firstIndex: number = lastIndex - postsPerPage;
  const currentPost =
    transformedData && transformedData.slice(firstIndex, lastIndex);

  const handleSortChange = (event: any) => {
    setSortOrder(event.target.value);
    //console.log("sortingOrder", event.target.value);
    sortData();
  };

  return (
    <div className="container">
      <div className="home__header">
        <div className="sorting__div">
          <label>Sort by</label>
          <select className="m-1" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Oldest</option>
            <option value="desc">Latest</option>
          </select>
        </div>
        <span className="m-3">
          {auth.id} ({auth.role})
        </span>
      </div>
      <div className="container my-4 mx-auto">
        <div className="row row-cols-3 row-cols-md-3 g-4">
          {transformedData &&
            currentPost.map((val: any, key: any) => {
              return (
                // <div className="col-lg-4 mb-4" key={val.questionId}>
                //   <div style={cardStyle} className="card">
                //     <div className="card-body">
                //       <h5 className="card-title">{val.question}</h5>
                //       <Link
                //         style={{ textDecoration: "none" }}
                //         to={`/Details/${val.questionId}`}
                //       >
                //         Read More
                //       </Link>
                //     </div>
                //   </div>
                // </div>

                <div className="col" key={val.questionId}>
                  <div
                    className="card p-0"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#D6D6D6",
                    }}
                  >
                    <div className="card-header text-secondary">
                      {val.createdBy}
                    </div>
                    {/* <img src={imgUrl} className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                      <h5 className="card-title">
                        {val.question.substring(0, 20)}...
                      </h5>
                      {/* <p className="card-text">{desc.substring(0, 20)}...</p> */}
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/Details/${val.questionId}`}
                      >
                        Read More
                      </Link>
                    </div>
                    <div className="card-footer">
                      <small className="text-body-secondary text-secondary">
                        {val.dateLog.split(",")[0]}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {transformedData && (
        <Pagination
          first={postsPerPage}
          last={transformedData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};
