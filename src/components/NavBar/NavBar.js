import React from "react";
import context from "react-bootstrap/esm/AccordionContext";
import "../css/NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          aria-label="Search"
          type="search"
          placeholder="Search"
          onChange={(event) => context.handleSearchChange(event)}
        />
        <button className="btn my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default NavBar;
