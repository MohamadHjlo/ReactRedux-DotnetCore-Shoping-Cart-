import { Link } from "react-router-dom";

const ListUsers = ({ users }) => {
  return (
    <div className="row">
      {users.map((u) => (
        <div key={u.id} className="col-6 col-md-4 col-sm-6">
          <div  className="card" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-gray fw-bold"><Link to={`/Users/showuser/${u.id}`}>UserName : {u.name}</Link></li>
              <li className="list-group-item">Family : {u.family}</li>
              <li className="list-group-item">Describtion : {u.describtion}</li>
            </ul>
            <div className="card-footer">ID : {u.id}</div>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default ListUsers;
