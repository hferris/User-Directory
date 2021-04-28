import React from "react";
import Header from "./components/Header/Header";
import API from "./utils/api";
import NavBar from "./components/NavBar/NavBar";

class App extends React.Component {
  state = { search: "", employees: [] };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = async () => {
    const { data } = await API.getUsers();
    const employees = data.results.map((item) => ({
      name: `${item.name.first} ${item.name.last}`,
      gender: item.gender,
      email: item.email,
      phone: item.phoneNum,
      image: item.picture.large,
    }));
    this.setState({ employees });
  };

  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState({ search: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.getEmployees(this.state.search)
      .then((res) => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, err: "" });
      })
      .catch((err) => this.setState({ err: err.message }));
  };

  filterEmployees = (employee) => {
    if (employee.name.includes(this.state.search)) {
      return true;
    }
    if (employee.gender.includes(this.state.search)) {
      return true;
    }
    if (employee.email.includes(this.state.search)) {
      return true;
    }
    if (employee.phone.includes(this.state.search)) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <>
        <Header />
        <NavBar
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          employees={[1, 2, 3]}
        />
        <div className="container-fluid">
          <div className="row align-items-center">
            <p className="col">Image</p>
            <p className="col">First Name & Last Name</p>
            <p className="col">Gender</p>
            <p className="col">Email</p>
            <p className="col">Phone Number</p>
          </div>
          <div className="container-fluid w-100">
            {this.state.employees.length === 0 ? (
              <h2> Let's Try Again!</h2>
            ) : (
              this.state.employees
                .filter(this.filterEmployees)
                .map((employee) => (
                  <ul className="list-group list-group-horizontal w-100">
                    <li className="list-group-item">
                      <img src={employee.image} alt={employee.name} />
                    </li>
                    <li className="list-group-item flex-fill">
                      {employee.name}
                    </li>

                    <li className="list-group-item flex-fill">
                      {employee.gender}
                    </li>

                    <li className="list-group-item flex-fill">
                      {employee.email}
                    </li>

                    <li className="list-group-item flex-fill">
                      {employee.phone}
                    </li>
                  </ul>
                ))
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
