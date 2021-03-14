import React from "react";

import { connect } from "react-redux";
import { ActionCreators } from "../actions/profile";
import Axios from "axios"


export class UserRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
      },

      submitted: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    this.setState({ submitted: true });
    this.props.dispatch(ActionCreators.formSubmittionStatus(true));
    event.preventDefault();
    const user = this.state.user;
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    const data = {
      "name": "bal",
      "email": "b@g",
      "password": "e3"
    }

    fetch("http://localhost:8000/user")
    .then((resp) => resp.json())
    .then((data) => {
      let normalizedData = normalize(data);
      this.setState({
        agendaTimeSlots: normalizedData.timeSlots,
      });
    })
    .catch((err) => {
      console.log(err);
    });

    fetch('http://localhost:8000/addUser',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'balsddfsd',
          email: 'bafsdfdsfl@gmail.com',
          password: 'bbdfdf12'
        })
    }).then(response => {
            console.log(response)
        })
        .catch(error =>{
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

  render() {
    const { name, email, password} = this.state.user;
    return (
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(UserRegistration);
