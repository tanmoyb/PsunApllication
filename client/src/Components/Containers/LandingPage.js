import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import AgendaView from "../Common/AgendaView";
import normalize from "json-api-normalizer";
import SideBar from "../Common/SideBar";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#eeeaf1;",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1100px",
  },
  headerWrapper: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "38px",
    marginLeft: "137px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
});

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agendaTimeSlots: [],
    };
  }

  componentDidMount() {
    fetch("https://api.brella.io/api/aalto/events/unicorndemo2025/time_slots")
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
  }

  getHeader() {
    const { classes } = this.props;
    return (
      <div className={classes.headerWrapper}>
        <span>Dashboard/Events</span>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.getHeader()}
        <div className={classes.root}>
          <SideBar></SideBar>
          <div className={classes.contentWrapper}>
            <AgendaView
              agendaTimeSlots={this.state.agendaTimeSlots}
            ></AgendaView>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
