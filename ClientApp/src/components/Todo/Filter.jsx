import todoContext from "../../context/TodoContext";
import {useContext} from 'react'
const FilterTodos = ({setloading}) => {
  const { getTodoByRange } = useContext(todoContext);
  const handleFilter = async (e) => {

    setloading(true);
    await getTodoByRange(e.target.value);
    setloading(false);
  };
  return (
    <div className="row mb-4">
      <div className="col-2 ">
        <select
          onChange={(e) => handleFilter(e)}
          className="form-select form-select-sm form-control"
        >
          <option value="null">All</option>
          <option value="2">2</option>
          <option value="1">1</option>
          <option value="4">4</option>
          <option value="12">12</option>
        </select>
      </div>
    </div>
  );
};

export default FilterTodos;
