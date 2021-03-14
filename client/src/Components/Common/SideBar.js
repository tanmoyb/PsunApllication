import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = () => ({
  root: {
    width: "100%",
    height: "900px",
    backgroundColor: "#FFFFFF",
  },
  drawer: {
    width: "150px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "110px",
  },
});

export class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    let drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Brella"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["", ""].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(SideBar);
