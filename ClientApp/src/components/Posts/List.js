import { Link } from "react-router-dom";
import DeletePost from "./Delete";

const ListPosts = ({ posts }) => {
  return (
    <div className="row ">
      {posts.map((p) => (
        <div key={p.id} className="col-6 col-md-4 col-sm-6 mb-5">
          <div className="card" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-gray fw-bold">
                <Link to={`/Posts/showpost/${p.id}`}>{p.title}</Link>
              </li>
              <li className="list-group-item"> {p.body}</li>
              <li className="list-group-item"> ID : {p.id}</li>
            </ul>
            <div className="card-footer text-center">
              <Link className="btn bg-indigo float-end "   to={`/posts/edit/${p.id}`}  >Edit</Link>
              <DeletePost  postId={p.id}  />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPosts;
