"use client";
import React from "react";
import "./login.css";
import TextField from "@mui/material/TextField";
import ButtonComponent from "@/components/Button/ButtonComponent";
import { loginHero } from "@/assets";
import { Image } from "@mui/icons-material";

function Login() {
  return (
    <div className="login-hero-container">
      <div className="login-form-container">
        <div className="login-heading">Genpact</div>
        <div className="login-sub-head">
          Artificial Intelligence Driving Results For The Travel Industry
        </div>
        <div className="login-support-text">
          Welcome back! Please login to your account.
        </div>
        <div className="login-input-containers">
          <TextField
            required
            // size="small"
            id="outlined-required"
            label="Name"
            name="name"
            // onChange={(e) => onChangeHandler(e)}
            // value={formValues?.name}
            className="login-inputs"
            // disabled
          />
          <TextField
            required
            // size="small"
            type="password"
            id="outlined-required"
            label="Password"
            name="password"
            // onChange={(e) => onChangeHandler(e)}
            // value={formValues?.name}
            className="login-inputs"
            // disabled
          />
        </div>
        <div className="login-button-container">
          <ButtonComponent
            name={"Login"}
            variant={"contained"}
            // disabled={value === "" || selectedTimeSlot === null}
            // onClick={() => {}}
          />
        </div>
      </div>
      <div className="login-pic-container">{/* <img src={loginHero} /> */}</div>
    </div>
  );
}

export default Login;
