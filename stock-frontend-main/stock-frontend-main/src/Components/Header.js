import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import icon from "../Assets/logo.png";
function Header(props) {
  //   const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "#e9f0f5" }}>
        <div className="navbar-left">
          <img src={icon} style={{ width: "80px", marginTop: "0px" }} />
        </div>
        {/* <Button size="small">Subscribe</Button> */}
        <Typography
          component="h2"
          variant="h5"
          color="#388f81"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          STOCKERR
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            props.setIslogged(false);
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

// Header.propTypes = {
//   sections: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Header;
