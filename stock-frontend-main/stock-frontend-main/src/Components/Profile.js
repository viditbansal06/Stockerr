import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import avatarimage from "../Assets/avatar.svg";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = <React.Fragment></React.Fragment>;

export default function OutlinedCard(props) {
  // console.log(props.props.person);
  return (
    <div style={{}}>
      <div
        style={{
          height: "90vh",
          width: "15vw",
          marginLeft: "2vw",
          marginTop: "3vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          alt="Samarth"
          src={avatarimage}
          style={{ width: "100px", height: "100px" }}
        />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {
            <div style={{ marginTop: "2vh" }}>
              {<div>Email :</div>}
              {props.props.person.email}
            </div>
          }
        </Typography>
        <Typography variant="h5" component="div">
          {
            <div style={{ marginTop: "2vh" }}>
              {<div>Username :</div>}
              {props.props.person.username}
            </div>
          }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {
            <div style={{ marginTop: "2vh" }}>
              {<div>Mobile Number :</div>}
              {props.props.person.mobileNo}
            </div>
          }
        </Typography>
        <Button
          size="small"
          onClick={() => {
            props.setIslogged(false);
          }}
          style={{ marginLeft: "-12vw",position:"relative",marginTop:"50vh" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
