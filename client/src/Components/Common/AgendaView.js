import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const styles = () => ({
  root: {
    padding: "24px",
    backgroundColor: "#FFFFFF",
    width: "100%",
    marginLeft: "20px",
    marginTop: "20px",
  },
  table: {
    width: "100%",
  },
  eventWrapper: {
    paddingBottom: "40px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonWrapper: {
    marginRight: "150px",
  },
  searchBar: {
    height: "50px",
  },
});

export class AgendaView extends React.Component {
  constructor(props) {
    super(props);
  }

  createData(name, date, duration) {
    return { name, date, duration };
  }

  getAgendaTable() {
    const { classes, agendaTimeSlots } = this.props;

    let rows = [];
    for (const [key, value] of Object.entries(agendaTimeSlots)) {
      let agendaName = value.attributes.title;
      let agendaDate = moment(value.attributes.startTime).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      let agendaDuration = value.attributes.duration;

      rows.push(
        this.createData(agendaName, agendaDate, agendaDuration, 6.0, 24, 4.0)
      );
    }

    return (
      <div className={classes.tableWrapper}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="agenda table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Region</TableCell>
                <TableCell align="right">Industy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.duration}</TableCell>
                  <TableCell align="right">PlaceHolder Country</TableCell>
                  <TableCell align="right">PlaceHolder Region</TableCell>
                  <TableCell align="right">PlaceHolder Industry</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  getEvents() {
    const { classes } = this.props;
    return (
      <div className={classes.buttonWrapper}>
        <Button variant="outlined">MyEvents</Button>
        <Button variant="outlined">AllEvents</Button>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <div className={classes.eventWrapper}>{this.getEvents()}</div>
        {this.getAgendaTable()}
      </Card>
    );
  }
}

export default withStyles(styles)(AgendaView);
