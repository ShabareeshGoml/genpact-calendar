"use client";
import React, { useState } from "react";
import "./login.css";
import TextField from "@mui/material/TextField";
import ButtonComponent from "@/components/Button/ButtonComponent";
import { loginHeroSVG } from "@/assets";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const [formValues, setformValues] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    if (formValues?.email === "agent" && formValues.password === "agent") {
      router.push(`/agent/appointments?agent_id=5`, {
        scroll: false,
      });
    } else if (
      formValues?.email === "admin" &&
      formValues.password === "admin"
    ) {
      router.push(`/admin`, {
        scroll: false,
      });
    } else {
      toast.error("Login Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <div className="login-hero-container">
      <ToastContainer />
      <div className="login-form-container">
        <div className="login-heading">Genpact</div>
        <div className="login-sub-head">
          Organize your appointments, events, and tasks in one place.
        </div>
        <div className="login-support-text">
          Welcome back! Please login to your account.
        </div>
        <div className="login-input-containers">
          <TextField
            required
            // size="small"
            id="outlined-required"
            label="Email"
            name="email"
            type="email"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.email}
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
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.password}
            className="login-inputs"
            // disabled
          />
        </div>
        <div className="login-button-container">
          <ButtonComponent
            name={"Login"}
            variant={"contained"}
            // disabled={value === "" || selectedTimeSlot === null}
            onClick={(e) => onLoginClick(e)}
          />
        </div>
      </div>
      <div className="login-pic-container">
        {" "}
        <Image src={loginHeroSVG} alt="login" />
      </div>
    </div>
  );
}

export default Login;
