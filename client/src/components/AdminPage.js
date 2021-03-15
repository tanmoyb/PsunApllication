import React from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions/profile";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#eeeaf1;",
  },
  form: {
    marginTop: "20px",
    marginBottom: "40px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  header: {
    marginTop: "40px",
    fontWeight: 400,
    fontSize: 18,
    width: "100%",
  },
  list: {
    marginTop: "40px",
    backgroundColor: "#838ab9",
    width: "100%",
    height: "100%",
  },
});

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
  componentDidMount() {
    fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          userData: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile !== this.props.profile) {
      fetch("http://localhost:8000/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            userData: result.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  submitForm(event) {
    this.setState({ submitted: true });
    this.props.dispatch(ActionCreators.formSubmittionStatus(true));
    event.preventDefault();
    const user = this.state.user;

    fetch("http://localhost:8000/addUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    })
      .then((response) => {
        response.json();
      })
      .catch((error) => {
        console.log(error);
      });

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
    const users = this.state.userData;
    const usersItems = users.map((user) => (
      <li key={user.toString()}>
        <span>UserName :</span>
        {user.name}
      </li>
    ));
    return <ul>{usersItems}</ul>;
  }

  render() {
    const { name, email, password } = this.state.user;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div>
          <span className={classes.header}>Create User</span>
          <form className={classes.form} onSubmit={this.submitForm}>
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
        <div className={classes.list}>
          <span className={classes.header}>UserList :</span>
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

export default compose(
  connect(mapStateToProps, null),
  withStyles(styles)
)(AdminPage);
