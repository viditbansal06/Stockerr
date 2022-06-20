import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Item.css";
import Header from "./Header";
import Profile from "./Profile";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Line } from "react-chartjs-2";
const Items = (props) => {
  const [name, setName] = useState(props.person.username);
  const [email, setEmail] = useState(props.person.email);
  const [mobileNo, setMobileno] = useState(props.person.mobileNo);
  const [password, setPassword] = useState(props.person.password);
  const [matchscore, setMatchscore] = useState(props.person.matchscore);
  // console.log(props.person);
  const url = "http://localhost:5001";
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [sprice, setSprice] = useState("");
  const [pprice, setPprice] = useState("");
  const [unit, setUnit] = useState("pcs");
  const [date, setDate] = useState("");
  const [arr, setArr] = useState([]);
  const [bucketfromdb, setBucket] = useState(props.person.bucket);
  const [finalarr, setFarr] = useState([]);

  const [queryfromdb, setQuery] = useState(props.person.query);
  const [queryarr, setQarr] = useState(props.person.query);

  const [temp, setTemp] = useState([]);
  const [shareemail, setShareemail] = useState("");
  const [showmodal, setShowmodal] = useState(false);
  const [company, setCompany] = useState();
  const [companyDetails, setCompanyDetails] = useState();
  const [overview, setOverview] = useState([]);
  const [label, setLabel] = useState([]);
  const [values, setValues] = useState([]);
  var meta = "Meta Data";
  var timeS = "Time Series (5min)";
  var valsarray = [];
  const data = {
    labels: label,
    datasets: [
      {
        label: company,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values,
      },
    ],
  };
  // vidit -   5P3FFBYA77H8IA2J
  // samarth - 6MODOVS5BVCKA88L
  // pritish - MAGS81AHM2HWKFRO

  useEffect(() => {
    fillbucket();
    console.log(props.person);
  }, [bucketfromdb]);

  // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=6MODOVS5BVCKA88L
  const updateArray = (val) => {
    setValues((arr) => [...arr, val]);
  };
  // day https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=30min&apikey=demo
  // daily https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo
  // weekly https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo
  // weekly https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo

  const getGraphData = () => {
    // https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
    // axios
    //   .get(
    //     `
    //     https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=6MODOVS5BVCKA88L
    //       `
    //   )
    //   .then((response) => {
    //     console.log(response);  
    //     setOverview(response.data);
    //   });
    axios
      .get(
        `
        https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${company}&apikey=6MODOVS5BVCKA88L
          `
      )
      .then((response) => {
        console.log(response.data);
        setCompanyDetails(response.data["Monthly Time Series"]);
        const keys = Object.keys(response.data["Monthly Time Series"]);
        setLabel(keys);
        // setLabel(label.reverse())
        keys.forEach((key, index) => {
          updateArray(companyDetails[key]["4. close"]);
        });
        // setValues(keys.reverse())
        setShowmodal(true);
      });
  };
  const updateBucket = (val) => {
    setFarr((arr) => [...arr, val]);
  };
  const fillbucket = () => {
    bucketfromdb.map(function (i) {
      axios
        .get(
          `
        https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${i}&apikey=MAGS81AHM2HWKFRO`
        )
        .then((response) => {
          // console.log(response.data.bestMatches[0]);
          updateBucket(response.data.bestMatches[0]);
        });
    });
  };
  const getdata = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=MAGS81AHM2HWKFRO`
      )
      .then((response) => {
        setArr(response.data.bestMatches);
        // console.log(response.data.bestMatches);
      });
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const saveBucket = async () => {
    const data = await axios.patch(
      `${url}/api/users/bucketchange`,
      { finalarr, email, name, password, mobileNo, matchscore, queryarr },
      config
    );
  };

  const shareBucket = async () => {
    const data = await axios.patch(
      `${url}/api/users/sharebucket`,
      { finalarr, shareemail, name, password, mobileNo, matchscore, queryarr },
      config
    );
  };
  const saveQuery = async () => {
    const data = await axios.patch(
      `${url}/api/users/querychange`,
      { finalarr, email, name, password, mobileNo, matchscore, queryarr },
      config
    );
  };

  const shareQuery = async () => {
    const data = await axios.patch(
      `${url}/api/users/sharequery`,
      { finalarr, shareemail, name, password, mobileNo, matchscore, queryarr },
      config
    );
  };
  const addstock = (i) => {
    setFarr([...finalarr, i]);
    // fillbucket();
  };
  const addquery = (i) => {
    setQarr([...queryarr, i]);
  };
  function handleTextChange(event) {
    setText(event.target.value);
  }
  function handleShareChange(event) {
    setShareemail(event.target.value);
  }

  return (
    <div className="items" style={{}}>
      <Header setIslogged={props.setIslogged} />

      {showmodal ? (
        <div
          style={{
            backgroundColor: "white",
            height: "90vh",
            position: "absolute",
            width: "90vw",
            zIndex: 5,
            marginTop: "0vh",
            marginLeft: "5vw",
          }}
        >
          <div>
            <div>{/* {companyDetails.} */}</div>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {
                <div style={{ marginTop: "2vh", marginLeft: "2vw" }}>
                  {company}
                </div>
              }
            </Typography>
            <div
              onClick={() => setShowmodal(false)}
              style={{
                width: "50px",
                height: "50px",
                marginLeft: "88vw",
                marginTop: "-3vh",
                fontSize: "25px",
              }}
            >
              X
            </div>
          </div>
          <div style={{ width: "70vw" }}>
            <Line
              style={{ marginTop: "6vh", marginLeft: "12vw" }}
              data={data}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div style={{ display: "flex", backgroundColor: "#e9f0f5" }}>
        <div style={{ height: "100%", borderRight: "1px grey solid" }}>
          <Profile props={props} setIslogged={props.setIslogged} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              marginRight: "30px",
            }}
          >
            <div
              style={{
                width: "45vw",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid grey",
                  paddingBottom: "20px",
                  paddingLeft: "30px",
                  alignItems: "center",
                  textAlign: "center",
                }}
                className="textitem"
              >
                BUCKET
              </div>
              <div
                style={{
                  borderBottom: "1px solid grey",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    marginLeft: "5px",
                    marginRight: "25px",
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ marginLeft: "1vw", width: "110px" }}>
                    Symbol Name
                  </div>
                  <div style={{ marginLeft: "1.5vw", width: "110px" }}>
                    Company Name
                  </div>
                  <div style={{ marginLeft: "2vw", width: "110px" }}>
                    Company Region
                  </div>
                  {/* <div style={{ marginLeft: "2vw", width: "80px" }}>
                    Company Match Score
                  </div> */}
                </div>
              </div>
              <div style={{ marginTop: "25px" }}>
                {finalarr.map(function (i) {
                  var temp = "1. symbol";
                  var name = "2. name";
                  var region = "4. region";
                  var score = "9. matchScore";
                  return (
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "10px",
                        paddingBottom: "18px",
                        marginLeft: "25px",
                        marginRight: "25px",
                        fontSize: "13px",
                        borderBottom: "1px solid grey",
                      }}
                      key={i[[temp]]}
                    >
                      <div style={{ marginLeft: "0vw", width: "110px" }}>
                        {i[temp]}
                      </div>
                      <div style={{ marginLeft: "2vw", width: "110px" }}>
                        {i[name]}
                      </div>
                      <div style={{ marginLeft: "2vw", width: "110px" }}>
                        {i[region]}
                      </div>
                      {/* <div style={{ marginLeft: "2vw", width: "110px" }}>
                        {i[score]}
                      </div> */}
                      <div
                        style={{
                          // backgroundColor: "#388f81",
                          textAlign: "center",
                          paddingTop: "1vh",
                          paddingBottom: "1vh",
                          marginTop: "0vh",
                          cursor: "pointer",
                          color: "#388f81",
                          width: "80px",
                          marginLeft: "25px",
                        }}
                        onClick={() => {
                          setCompany(i[temp]);
                          getGraphData();
                        }}
                      >
                        Show Graph
                      </div>
                    </div>
                  );
                })}
                <div style={{ marginLeft: "25px", marginRight: "25px" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        style={{
                          marginTop: "10px",
                          fontSize: "15px",
                          border: "1px solid gray",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingLeft: "10px",
                          width: "15vw",
                          borderRadius: "5px",
                        }}
                        value={shareemail}
                        onChange={handleShareChange}
                        placeholder="Share Bucket"
                      />
                      <div
                        style={{
                          backgroundColor: "#388f81",
                          textAlign: "center",
                          paddingTop: "1vh",
                          paddingBottom: "1vh",
                          marginTop: "1vh",
                          cursor: "pointer",
                          color: "white",
                          width: "120px",
                          marginLeft: "25px",
                        }}
                        onClick={() => {
                          shareBucket();
                        }}
                      >
                        Share
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          marginTop: "10px",
                        }}
                        onClick={() => {
                          saveBucket();
                        }}
                      >
                        <div style={{ color: "#388f81" }}>Save Bucket</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "37vw",
                borderLeft: "1px solid grey",
                height: "95vh",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid grey",
                  paddingBottom: "20px",
                  marginTop: "20px",
                  paddingLeft: "0px",
                }}
                className="textitem"
              >
                ADD A NEW STOCK
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "25px",
                    marginLeft: "10vw",
                  }}
                >
                  <div>
                    <div className="textitem2">Search with Stock Name</div>
                    <div>
                      <input
                        type="text"
                        style={{
                          marginTop: "10px",
                          fontSize: "15px",
                          border: "1px solid gray",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingLeft: "0px",
                          width: "15vw",
                          borderRadius: "5px",
                          textAlign: "center",
                        }}
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Search Stock"
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#388f81",
                    textAlign: "center",
                    paddingTop: "1vh",
                    paddingBottom: "1vh",
                    marginTop: "1vh",
                    cursor: "pointer",
                    color: "white",
                    width: "80px",
                    marginLeft: "15.5vw",
                  }}
                  onClick={() => {
                    addquery(text);
                    getdata();
                  }}
                >
                  Search
                </div>

                <div style={{ marginTop: "2vh", marginLeft: "-40px" }}>
                  <div className="textitem2" style={{}}>
                    Previous Searches
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {queryarr.length &&
                      queryarr.map(function (i) {
                        return (
                          <div
                            style={{ marginLeft: "5px", marginRight: "5px" }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setText(i);
                              }}
                              key={i}
                            >
                              {i}
                            </Button>
                          </div>
                        );
                      })}
                  </div>
                  <div style={{ display: "flex", marginLeft: "5vw" }}>
                    <input
                      type="text"
                      style={{
                        marginTop: "10px",
                        fontSize: "15px",
                        border: "1px solid gray",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        width: "10vw",
                        borderRadius: "5px",
                      }}
                      value={shareemail}
                      onChange={handleShareChange}
                      placeholder="Share Searches"
                    />
                    <div
                      style={{
                        backgroundColor: "#388f81",
                        textAlign: "center",
                        paddingTop: "1vh",
                        paddingBottom: "1vh",
                        marginTop: "1vh",
                        cursor: "pointer",
                        color: "white",
                        width: "120px",
                        marginLeft: "25px",
                      }}
                      onClick={() => {
                        shareQuery();
                      }}
                    >
                      Share
                    </div>
                    <div style={{marginLeft: "5vw",
                          marginTop: "1.5vh",}}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                        }}
                        onClick={() => {
                          saveQuery();
                        }}
                      >
                        <div style={{ color: "#388f81" }}>Save Searches</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  borderBottom: "1px solid grey",
                  borderTop: "1px solid grey",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    marginLeft: "5px",
                    marginRight: "25px",
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ marginLeft: "1vw", width: "110px" }}>
                    Symbol Name
                  </div>
                  <div style={{ marginLeft: "1.5vw", width: "110px" }}>
                    Company Name
                  </div>
                  <div style={{ marginLeft: "2vw", width: "110px" }}>
                    Company Region
                  </div>
                  <div style={{ marginLeft: "2vw", width: "80px" }}>
                    Company Match Score
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                {arr.map(function (i) {
                  var temp = "1. symbol";
                  var name = "2. name";
                  var region = "4. region";
                  var score = "9. matchScore";
                  // console.log(i);
                  return (
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        marginLeft: "25px",
                        marginRight: "25px",
                        fontSize: "13px",
                      }}
                      key={i[[temp]]}
                    >
                      <div style={{ marginLeft: "0vw", width: "110px" }}>
                        {i[temp]}
                      </div>
                      <div style={{ marginLeft: "2vw", width: "110px" }}>
                        {i[name]}
                      </div>
                      <div style={{ marginLeft: "2vw", width: "110px" }}>
                        {i[region]}
                      </div>
                      <div style={{ marginLeft: "2vw", width: "110px" }}>
                        {i[score]}
                      </div>
                      <div
                        style={{
                          backgroundColor: "#388f81",
                          textAlign: "center",
                          paddingTop: "1vh",
                          paddingBottom: "1vh",
                          marginTop: "0vh",
                          cursor: "pointer",
                          color: "white",
                          width: "80px",
                          marginLeft: "25px",
                        }}
                        onClick={() => {
                          addstock(i);
                        }}
                      >
                        Add to Bucket
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
