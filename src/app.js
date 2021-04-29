import React from "react";
import api from "./utils/api";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";

class App extends React.Component {
  state = {search: '', employees: [], 
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = async () => {
    const { data } = await api.getUsers();
    const employees = data.results.map((item) => ({
      name: `${item.name.first} ${item.name.last}`,
      email: item.email,
      phone: item.cell,
      image: item.picture.large,
      gender: item.gender,
    }));
    this.setState({ employees });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    // const name = e.target.name;
    this.setState({ search: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.getEmployees(this.state.search)
      .then((res) => {
        if (res.data.status === 'error') {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: '' });
      })
      .catch((err) => this.setState({ error: err.message }));
  };

  filterEmployees = (employee) => {
    if (employee.name.includes(this.state.search)) {
      return true;
    }
    if (employee.phone.includes(this.state.search)) {
      return true;
    }
    if (employee.email.includes(this.state.search)) {
      return true;
    }
    if (employee.gender.includes(this.state.search)) {
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
        <div className=''>
          <div className=''>
            {this.state.employees.length === 0 ? (
              <h2>!Let's Try Again!</h2>
            ) : (
              this.state.employees
                .filter(this.filterEmployees)
                .map((employee) => (
                  <ul className=''>
                    <li className=''>
                      <img src={employee.image} alt={employee.name} />
                    </li>
                    <li className=''>
                      {employee.name}
                    </li>

                    <li className=''>
                      {employee.phone}
                    </li>

                    <li className=''>
                      {employee.email}
                    </li>

                    <li className=''>
                      {employee.gender}
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
