import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchResults } from "../FetchingApi/useFetchResults";
import { Pagination } from "../services/Pgination";

const Results = ({ searchTerm }: any) => {
  let { results, kFetch } = useFetchResults();

  useEffect(() => {
    kFetch(`http://localhost:5000/questionsans/${searchTerm}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const myStyle: any = {
    margin: "10px",
    textAlign: "center",
    paddingBottom: "10px",
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
  const currentPost = results && results.slice(firstIndex, lastIndex);

  return (
    <div className="container">
      <div>
        <h1 style={myStyle}>
          Question <span style={{ color: "red" }}>&</span> Answer
        </h1>
      </div>
      <div className="row">
        {results &&
          currentPost.map((val: any, key: any) => {
            return (
              <div className="col-lg-4 mb-4" key={val.questionId.S}>
                <div style={cardStyle} className="card">
                  <div className="card-body">
                    <h5 className="card-title">{val.question.S}</h5>
                    <p
                      className="card-text text-truncate"
                      style={{ maxWidth: "700px" }}
                    >
                      {val.answer.S}{" "}
                    </p>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/Details/${val.questionId.S}`}
                    >
                      Read More...
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {results && (
        <Pagination
          first={postsPerPage}
          last={results.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Results;
