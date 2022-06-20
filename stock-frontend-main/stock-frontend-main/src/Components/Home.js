import React, { useState, useEffect } from "react";
import icon from "../Assets/logo.png";
import money from "../Assets/money.svg";
import insta from "../Assets/insta.svg";
import fb from "../Assets/fb.svg";
import link from "../Assets/link.svg";
import you from "../Assets/you.svg";
import twit from "../Assets/twit.svg";
import "./Home.css";
import axios from "axios";

const Home = (props) => {
  const [name, setName] = useState(props.person.username);
  const [email, setEmail] = useState(props.person.email);
  const [password, setPassword] = useState(props.person.password);
  const [confirmpassword, setCpassword] = useState(props.person.password);
  const [mobileNo, setMobileno] = useState(props.person.mobileNo);
  const [show, setShow] = useState(false);
  const [logsign, setLogsign] = useState("signup");
  const url = "http://localhost:5001";
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleCpasswordChange(event) {
    setCpassword(event.target.value);
  }
  function handleMobileChange(event) {
    setMobileno(event.target.value);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const register = async () => {
    props.setPerson({
      username: name,
      email: email,
      mobileNo: mobileNo,
      password: password,
      bucket: [],
    });
    const data = await axios.post(
      `${url}/api/users/register`,
      { email, password, name, mobileNo },
      config
    );
    props.setIslogged(true);
  };
  const login = async () => {
    const data = await axios.post(
      `${url}/api/users/login`,
      { email, password },
      config
    );
    props.setPerson({
      username: data.data.name,
      email: data.data.email,
      mobileNo: data.data.mobileNo,
      bucket: data.data.bucket,
      password: data.data.password,
      query: data.data.query,
    });
    console.log(data.data);
    props.setIslogged(true);
  };
  return (
    <div className="home">
      <div
        style={{
          backgroundColor: "#388f81",
          marginTop: "-20px",
          height: "65px",
        }}
      >
        <div className="navbar">
          <div className="navbar-left">
            {/* <img src={icon} style={{ width: "80px", marginTop: "-10px" }} /> */}
          </div>
          <div className="navbar-right"></div>
        </div>
      </div>

      <div className="banner " style={{ backgroundColor: "#e9f0f5" }}>
        <div className="banner-left">
          <div style={{ fontSize: "50px" }}>
            <div
              style={{
                marginTop: "10vh",
                position: "absolute",
                width: "60vw",
                marginLeft: "5vw",
              }}
            >
              <span style={{ fontWeight: "600" }}>
                Stock Analysis{" "}
                <span style={{ fontWeight: "300", color: "#388f81" }}>&</span>{" "}
                Screening tool
              </span>{" "}
              <br />
              <span style={{ fontWeight: "300" }}>
                for Investors in India
              </span>{" "}
            </div>
          </div>
          <div
            style={{
              color: "#388f81",
              position: "absolute",
              marginTop: "25vh",
              marginLeft: "5vw",
              fontSize: "30px",
              fontWeight: "500",
            }}
            className="greyatma"
          >
            Atma Nirbhar Vyapaari bane
          </div>
          <div
            style={{
              marginTop: "70vh",
              position: "absolute",
              display: "flex",
              marginLeft: "5vw",
            }}
          >
            <div style={{ fontWeight: "500" }} className="greyatma">
              {/* Made In India */}
            </div>
            <div
              style={{ marginLeft: "50px", fontWeight: "500" }}
              className="greyatma"
            ></div>
          </div>
        </div>
        {logsign == "login" ? (
          <div>
            <div className="banner-right">
              <div
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  marginLeft: "65vw",
                  marginTop: "10vh",
                  paddingLeft: "2.5vw",
                  paddingTop: "4vh",
                  paddingBottom: "4vh",
                  paddingRight: "3vw",
                }}
              >
                <div style={{ fontSize: "30px", color: "#388f81" }}>
                  Login to Application
                </div>
                <div
                  style={{
                    marginTop: "35px",
                    fontWeight: "600",
                    color: "grey",
                  }}
                >
                  Enter Email
                </div>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    border: "1px solid gray",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "15px",
                    width: "250px",
                    borderRadius: "5px",
                  }}
                  placeholder="xyz@mail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                <div
                  style={{
                    marginTop: "35px",
                    fontWeight: "600",
                    color: "grey",
                  }}
                >
                  Enter password
                </div>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    border: "1px solid gray",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "15px",
                    width: "250px",
                    borderRadius: "5px",
                  }}
                  placeholder="********"
                  value={password}
                  onChange={handlePasswordChange}
                />{" "}
                <div
                  style={{
                    backgroundColor: "#388f81",
                    textAlign: "center",
                    paddingTop: "1vh",
                    paddingBottom: "1vh",
                    marginTop: "4vh",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => {
                    login();
                  }}
                >
                  Login
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                marginLeft: "67vw",
                marginTop: "50vh",
                paddingLeft: "2.5vw",
                paddingTop: "4vh",
                paddingBottom: "4vh",
                paddingRight: "4vw",
              }}
              onClick={() => {
                setLogsign("signup");
              }}
            >
              New User ? Click To Register
            </div>
          </div>
        ) : (
          <div>
            <div className="banner-right">
              <div
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  marginLeft: "60vw",
                  marginTop: "10vh",
                  paddingLeft: "2.5vw",
                  paddingTop: "4vh",
                  paddingBottom: "4vh",
                  paddingRight: "3vw",
                }}
              >
                <div style={{ fontSize: "30px" }}>Signup to Application</div>
                <div
                  style={{
                    marginTop: "35px",
                    fontWeight: "600",
                    color: "grey",
                  }}
                >
                  Enter Username
                </div>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    border: "1px solid gray",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "15px",
                    width: "250px",
                    borderRadius: "5px",
                  }}
                  placeholder="username"
                  value={name}
                  onChange={handleNameChange}
                />
                <div style={{ display: "flex" }}>
                  <div>
                    <div
                      style={{
                        marginTop: "35px",
                        fontWeight: "600",
                        color: "grey",
                      }}
                    >
                      Enter Email
                    </div>
                    <input
                      type="text"
                      style={{
                        marginTop: "10px",
                        fontSize: "16px",
                        border: "1px solid gray",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        paddingLeft: "15px",
                        width: "250px",
                        borderRadius: "5px",
                      }}
                      placeholder="xyz@mail.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div style={{ marginLeft: "25px" }}>
                    <div
                      style={{
                        marginTop: "35px",
                        fontWeight: "600",
                        color: "grey",
                      }}
                    >
                      Enter Mobile Number
                    </div>
                    <input
                      type="text"
                      style={{
                        marginTop: "10px",
                        fontSize: "16px",
                        border: "1px solid gray",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        paddingLeft: "15px",
                        width: "250px",
                        borderRadius: "5px",
                      }}
                      placeholder="+12-1234567890"
                      value={mobileNo}
                      onChange={handleMobileChange}
                    />
                  </div>{" "}
                </div>{" "}
                <div style={{ display: "flex" }}>
                  <div>
                    <div
                      style={{
                        marginTop: "35px",
                        fontWeight: "600",
                        color: "grey",
                      }}
                    >
                      Enter password
                    </div>
                    <input
                      type="text"
                      style={{
                        marginTop: "10px",
                        fontSize: "16px",
                        border: "1px solid gray",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        paddingLeft: "15px",
                        width: "250px",
                        borderRadius: "5px",
                      }}
                      placeholder="********"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        marginTop: "35px",
                        fontWeight: "600",
                        color: "grey",
                        marginLeft: "25px",
                      }}
                    >
                      Confirm password
                    </div>
                    <input
                      type="text"
                      style={{
                        marginTop: "10px",
                        fontSize: "16px",
                        border: "1px solid gray",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        paddingLeft: "15px",
                        width: "250px",
                        borderRadius: "5px",
                        marginLeft: "25px",
                      }}
                      placeholder="********"
                      value={confirmpassword}
                      onChange={handleCpasswordChange}
                    />
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#388f81",
                    textAlign: "center",
                    paddingTop: "1vh",
                    paddingBottom: "1vh",
                    marginTop: "4vh",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => {
                    register();
                  }}
                >
                  Register
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                marginLeft: "70vw",
                marginTop: "59vh",
                paddingLeft: "2.5vw",
                paddingTop: "4vh",
                paddingBottom: "4vh",
                paddingRight: "4vw",
              }}
              onClick={() => {
                setLogsign("login");
              }}
            >
              Existing User ? Click To Login
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3vh",
          marginBottom: "5vh",
          backgroundColor:"#388f81",
          marginTop: "-20px",
          height:"250px"
        }}
      >
        <div style={{marginTop: "40px"}}>
          <div>
            <div
              style={{ fontWeight: "600", fontSize: "25px" }}
              className="orangecolor"
            >
              Get in touch
            </div>
            <div style={{ marginTop: "20px" }}>random@gmail.in</div>
            <div style={{ fontSize: "30px", marginTop: "20px" }}>
              +91-1234567890
            </div>
          </div>{" "}
        </div>
        <div style={{marginTop: "40px"}}>
          <div>
            <div
              style={{ fontWeight: "600", fontSize: "25px" }}
              className="orangecolor"
            >
              Information
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <div style={{ marginTop: "20px" }}>Refund Policy</div>
                <div style={{ marginTop: "20px" }}>Privacy Policy</div>
                <div style={{ marginTop: "20px" }}>Terms & Conditions</div>
              </div>
              <div style={{ marginLeft: "8vw" }}>
                <div style={{ marginTop: "20px" }}>FAQ's</div>
                <div style={{ marginTop: "20px" }}>Pricings</div>
                <div style={{ marginTop: "20px" }}>Blogs</div>
              </div>
            </div>
          </div>{" "}
        </div>
        <div style={{marginTop: "40px"}}>
          <div>
            <div
              style={{ fontWeight: "600", fontSize: "25px" }}
              className="orangecolor"
            >
              Follow us
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginTop: "20px" }}>
                <img src={link} />
              </div>
              <div style={{ marginTop: "20px" }}>
                <img src={you} />
              </div>
              <div style={{ marginTop: "20px" }}>
                {" "}
                <img src={fb} />
              </div>
              <div style={{ marginTop: "20px" }}>
                <img src={insta} />
              </div>
              <div style={{ marginTop: "20px" }}>
                <img src={twit} />
              </div>
            </div>
            {/* <div style={{ marginTop: "20px" }}>
              FloBiz is a product by <span style={{}}>Flobiz</span>
            </div> */}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
