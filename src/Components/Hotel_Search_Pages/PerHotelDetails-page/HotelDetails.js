import React, { useState, useEffect } from "react";
import {
  Card,
  TextField,
  CardContent,
  Button,
  CardHeader,
  CardMedia,
  Popover,
  Typography,
  FormControl,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./hotelDetails.css";
import DateFnsUtils from "@date-io/date-fns";
import ImageGallery from "react-image-gallery";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import hotelPic from "./images/hotel-img1.jpg";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  CardRoot: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
  },
  HotelCardMedia: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  hotelContent: {
    flex: "1 1 0 auto",
    [theme.breakpoints.down("sm")]: {
      flex: "100%",
    },
  },
  bookNowContent: {
    flex: "1 1  auto",
    marginTop: "10px",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  hotelBookLink: {
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const HotelDetails = () => {
  const { hotelId } = useParams();
  let [hotel, setHotel] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [persons, setPersons] = useState(1);
  const [room] = useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [numberOfRoom, setNumberOfRoom] = React.useState("1");

  useEffect(() => {
    axios
      .get(`https://hotel-api-sm.herokuapp.com/api/v1/hotel-list/${hotelId}`)
      .then(function (response) {
        setHotel(response.data.data[0]);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        } else {
          alert(error);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hotel) {
      const images = hotel.images.map((img) => {
        return {
          original: `https://hotel-api-sm.herokuapp.com/img/hotels/${img}`,
          thumbnail: `https://hotel-api-sm.herokuapp.com/img/hotels/${img}`,
        };
      });
      setImage(images);
    }
  }, [hotel]);

  const handleChange = (event) => {
    setNumberOfRoom(event.target.value);
  };

  const classes = useStyles();

  return (
    <div className="container mt-5">
      <Card variant="outlined">
        <CardContent>
          <div className="row ">
            <div className="col-md-3 mt-2">
              <TextField
                id="outlined-basic"
                label="Where Are You Going?"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="col-md-2 mt-2">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  className="ml-2"
                  variant="outline"
                  format="MM/dd/yyyy"
                  label="Check-In"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="col-md-2 mt-2">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  className="ml-2"
                  variant="outline"
                  format="MM/dd/yyyy"
                  label="Check-Out"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="col-md-3 mt-2">
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div>
                    <p>
                      {persons} Persons in {room} Room
                    </p>
                  </div>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <div className="expandPanel">
                    <div className="row">
                      <h6>Room 1:</h6>
                      <div className="col-md-6">
                        <p className="text-uppercase">adults</p>
                      </div>
                      <div className="col-md-6">
                        <div className="def-number-input number-input">
                          <button
                            onClick={() =>
                              persons > 0 && setPersons(persons - 1)
                            }
                            type="button"
                            className="minus"
                          ></button>
                          <input
                            className="quantity"
                            name="quantity"
                            value={persons}
                            type="number"
                          />
                          <button
                            onClick={() => setPersons(persons + 1)}
                            type="button"
                            className="plus"
                          ></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            <div className="col-md-2 mt-2">
              <Button
                variant="contained"
                style={{ backgroundColor: "#30dd89", padding: "12px" }}
                fullWidth
              >
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <hr></hr>

      {hotel && (
        <div>
          <div className="row mt-3">
            <div className="col-md-6">
              {image ? (
                <ImageGallery items={image} />
              ) : (
                <ImageGallery items={images} />
              )}
            </div>
            <div className="col-md-6">
              <CardHeader title={hotel.name} />
              <div className="ml-3">
                <FontAwesomeIcon icon={faStar} size="lg" color="#DFC857" />
                <FontAwesomeIcon icon={faStar} size="lg" color="#DFC857" />
                <FontAwesomeIcon icon={faStar} size="lg" color="#DFC857" />
                <FontAwesomeIcon icon={faStar} size="lg" color="#DFC857" />
              </div>

              <div className="ml-3">
                <FontAwesomeIcon icon={faMapMarkedAlt} size="md" />
                <span className="ml-2">{hotel.fullAddress}</span>
              </div>

              <Button variant="outlined">{hotel.category}</Button>
              <hr></hr>

              <div className="row">
                <div className="col-md-4">
                  <Card variant="outlined">
                    <CardContent>
                      <h6 className="text-center">Check-In</h6>
                      <p className="text-center">18</p>
                      <hr></hr>
                      <p className="text-center">jan | 2.00pm</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-md-4">
                  <Card variant="outlined">
                    <CardContent>
                      <h6 className="text-center">Check-Out</h6>
                      <p className="text-center">18</p>
                      <hr></hr>
                      <p className="text-center">jan | 2.00pm</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-md-4">
                  <Card style={{ backgroundColor: "beige" }} variant="outlined">
                    <CardContent>
                      <h6 className="text-center">You Choose</h6>
                      <p className="text-center">2</p>
                      <p className="text-center">guests in 1 room</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12" style={{ backgroundColor: "#f4f4f4" }}>
              <p>{hotel.description}</p>
            </div>
          </div>

          {/* Hotel card start */}
          <Card variant="outlined">
            <CardContent>
              <div className="row mt-5">
                <div className="col-md-12">
                  <Card className={classes.CardRoot}>
                    <CardMedia className={classes.HotelCardMedia}>
                      <img
                        src={hotelPic}
                        alt="Hotel"
                        width="280px"
                        height="280px"
                      ></img>
                    </CardMedia>

                    <CardContent className={classes.hotelContent}>
                      <CardHeader title="Superior (Single)" className="pb-0" />
                      <CardContent>
                        <FontAwesomeIcon
                          icon={faWifi}
                          color="green"
                          size="sm"
                        />
                        <span className="ml-1 mt-0">Wifi</span>

                        <div className="mt-2">
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                          >
                            Not Included: 15% VAT & 10% Service Charge
                          </Button>
                        </div>

                        <div className="mt-3">
                          <FontAwesomeIcon icon={faCheckSquare} />
                          <span
                            aria-owns={open ? "mouse-over-popover" : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            style={{ fontSize: "small", marginLeft: "3px" }}
                          >
                            Cancellation policy
                          </span>
                          <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                              paper: classes.paper,
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                          >
                            <Typography>
                              {/* <CardHeader title="Cancellation policy"/> */}
                              <CardContent>
                                <p>
                                  Before 7 days in Check-in free cencelation
                                </p>
                              </CardContent>
                            </Typography>
                          </Popover>
                        </div>

                        <div className="mt-3">
                          <span>
                            <span style={{ fontWeight: "bold" }}>Capacity</span>{" "}
                            <FontAwesomeIcon icon={faUser} size="sm" />
                            <span style={{ fontSize: "small" }}>1 adults</span>
                          </span>
                        </div>
                      </CardContent>
                    </CardContent>

                    <CardContent className={classes.bookNowContent}>
                      <Card style={{ backgroundColor: "#F3F1EB" }}>
                        <CardContent>
                          <p className="text-right">Price Per Night</p>
                          <div>
                            <h2 className="text-right"> BDT 7470</h2>
                          </div>
                          <div className="row">
                            <div className="col-md-8 text-right">
                              Number of Rooms
                            </div>
                            <div className="col-md-4 text-right">
                              <FormControl
                                className={classes.formControl}
                                fullWidth
                              >
                                {/* <InputLabel htmlFor="age-native-simple">
                          Number OF Rooms
                        </InputLabel> */}
                                <Select
                                  value={numberOfRoom}
                                  onChange={handleChange}
                                >
                                  {" "}
                                  <option aria-label="None" value="1" />
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Link
                              to="/hotelPre_Booking"
                              className={classes.hotelBookLink}
                            >
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#30dd89",
                                  color: "white",
                                  marginLeft: "195px",
                                }}
                              >
                                Book Now
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features of The Raintree Dhaka start */}
          <Card className="mt-5">
            <CardContent>
              <CardHeader title="Features of The Raintree Dhaka" />
              <hr></hr>
              <div className="row ml-1">
                <div className="col-md-2 col-3">
                  <h5>Food & Drinks</h5>
                </div>
                <div className="col-md-2 col-3">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}>
                    {" "}
                    Snack Bar/Restaurant
                  </span>
                </div>
                <div className="col-md-2 col-3">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}> Lunch & Dinner</span>
                </div>
                <div className="col-md-2 col-3">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}> Breakfast</span>
                </div>
              </div>
              <hr></hr>

              <div>
                {/* <CardHeader subheader="Services and conveniences" style={{ paddingBottom: "0px" }} /> */}
                <h5 className="ml-3">Services and conveniences</h5>

                <div className="row ml-3">
                  <div className="col-md-3 col-3">
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Newspape</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}>
                        {" "}
                        Express Check In/Check Out
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}>
                        {" "}
                        Transport Service
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Smoking Zone</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-3">
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Parking Area</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}>
                        {" "}
                        24/7 Front Desk
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}>
                        {" "}
                        Business center
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Tour Guide</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-3">
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Doctor</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Terrace</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Refrigerator</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Oven</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-3">
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}>
                        {" "}
                        Early Wake up call
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}>
                        {" "}
                        Wake up service
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}> Wheel chair</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                      <span style={{ fontSize: "small" }}>
                        {" "}
                        Early Wake up call
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <div>
              <hr></hr>

              <div className="row ml-1">
                <div className="col-md-2">
                  <h5 className="ml-1">Fitness, Relaxing</h5>
                </div>
                <div className="col-md-2 col-3">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}> Daily Housekeeping</span>
                </div>
                <div className="col-md-2 col-3 ">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}> Free toiletries</span>
                </div>
                <div className="col-md-2 col-3">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}> Long beds</span>
                </div>
                <div className="col-md-2 col-3">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}> Personal Locker</span>
                </div>
                <div className="col-md-2 col-3">
                  <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                  <span style={{ fontSize: "small" }}> Air Conditioner</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Nearby Landmarks start */}
          <Card className="mt-5">
            <CardContent>
              <h5 className="text-center">Nearby Landmarks</h5>
              <hr></hr>

              <div className="row">
                <div className="col-md-12 col-12">
                  <ul className="nearby-landmark">
                    <li>
                      <span>Banani, Dhaka</span>
                      <span>0.29k</span>
                    </li>
                    <li>
                      <span>Gulshan 1</span>
                      <span>0.59 km</span>
                    </li>
                    <li>
                      <span>Gulshan 2</span>
                      <span>0.61 km</span>
                    </li>
                    <li>
                      <span>Baridhara, Dhaka</span>
                      <span>1.40 km</span>
                    </li>
                    <li>
                      <span>Dhaka, Bangladesh</span>
                      <span>1.72 km</span>
                    </li>
                    <li>
                      <span>Dhaka Cantonment</span>
                      <span>2.29 km</span>
                    </li>
                    <li>
                      <span>Kuril, Progati Sharani, Dhaka</span>
                      <span>3.02 km</span>
                    </li>
                    <li>
                      <span>Nikunja, Dhaka</span>
                      <span>4.15 km</span>
                    </li>
                    <li>
                      <span>Farmgat, Dhaka</span>
                      <span>4.78 km</span>
                    </li>
                    <li>
                      <span>Kawran Bazar, Dhaka</span>
                      <span>5.28 km</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
