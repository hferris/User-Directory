import React from "react";
import "../css/NavBar.css";

function NavBar(props) {
  return (
    <div>
      <form>
        <input
          placeholder="Search"
          value={props.search}
          onChange={props.handleInputChange}
        />
        <datalist id="employees">
          {props.employees.map((employee) => (
            <option value={employee} key={employee} />
          ))}
          ;
        </datalist>
      </form>
    </div>
  );
}

export default NavBar;
