import React from "react";

import { connect } from "react-redux";
import { ActionCreators } from "../actions/profile";


export class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
      },
      userData: [],
      submitted: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount(){

    fetch('http://localhost:8000/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    }).then(response => response.json())
    .then(result => {
      console.log("response",result.data)
      this.setState({
        userData: result.data
      })
    })
      .catch(error => {
        console.log(error)
      })

  }
 
  submitForm(event) {
    this.setState({ submitted: true });
    this.props.dispatch(ActionCreators.formSubmittionStatus(true));
    event.preventDefault();
    const user = this.state.user;


    fetch('http://localhost:8000/addUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password
      })
    }).then(response => {
      console.log(response)
    })
      .catch(error => {
        console.log(error)
      })

    this.props.dispatch(ActionCreators.addProfile(user));
  }

  handleInputChange(event) {
    const target = event.target;
    const value =
      target.name === "name" ||
        target.name === "email" ||
        target.name === "password"
        ? target.value
        : "";
    const name = target.name;

    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user);
      user[name] = value;
      return { user };
    });
  }
 
  userList() {
    const numbers = this.state.userData;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number.name}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  
  render() {
    const { name, email, password } = this.state.user;
    console.log("this state",this.state.userData)
    return (
      <div>
      <div>
      <form onSubmit={this.submitForm}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      <div>
        {this.userList()}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(AdminPage);
