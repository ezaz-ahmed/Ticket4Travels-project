import React from "react";
import "../Header-part2/header2.css";
import Booking from "../Booking-Partt/Booking";
import Payment from "../payment-part/Payment";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import formValidation from "../../../Helper/formValidation";

function getSteps() {
  return ["Book", "Pay", "Process", "E-Ticekt"];
}

const fieldsValidation = {
  name: {
    error: "",
  },
  email: {
    error: "",
    validate: "email",
  },
  phone: {
    error: "",
    validate: "phone",
  },
};

const Header2 = () => {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Booking
            value={userInfo}
            handleChange={handleChange}
            handleNext={handleNext}
            formErrors={formErrors}
          />
        );
      case 1:
        return <Payment handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return "Process page";
      case 3:
        return "E-Ticekt page";
      default:
        return "Unknown step";
    }
  }

  const [userInfo, setUserInfo] = React.useState({
    name: "",
    phone: "",
    email: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [formErrors, setFormErrors] = useState({});
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    const error =
      formValidation(e.target.name, e.target.value, fieldsValidation) || "";
    setFormErrors({
      [e.target.name]: error,
    });
  };

  return (
    <div className="head">
      <div className="container ">
        <div className="row mt-5">
          <div className="col-md-12 col-12">
            {/* <h2 className="font-bold txt1">Tickets4Travels<img src={logo} width="90px" height="50px"></img></h2> */}
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              <Typography>{getStepContent(activeStep)}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
